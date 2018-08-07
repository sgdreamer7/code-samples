import React from 'react';
import { connect } from 'react-redux';

import { WithReduxSaga } from './';
import { currentUrl } from '../actions/common.actions';
import { Sidebar } from '../components';
import { ContentSection, MainLayout } from '../styles/layouts';
import '../styles/global';

export const DefaultPage = (options = {}) => (Page) => {
  const { sidebar = false } = options;

  @WithReduxSaga()
  @connect(state => ({
    common: state.common,
  }))
  class DefaultPageHOC extends React.Component {
    static async getInitialProps(ctx) {
      const { store, asPath } = ctx;
      const initialProps = Page.getInitialProps
        ? await Page.getInitialProps(ctx)
        : {};
      store.dispatch(currentUrl(asPath));
      return initialProps;
    }

    render() {
      return (
        <MainLayout>
          {sidebar && <Sidebar currentUrl={this.props.common.currentUrl}/>}
          <ContentSection>
            <Page {...this.props} />
          </ContentSection>
        </MainLayout>
      );
    }
  }

  return DefaultPageHOC;
};
