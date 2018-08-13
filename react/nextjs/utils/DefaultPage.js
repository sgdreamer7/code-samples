import React from 'react';
import { connect } from 'react-redux';

import { WithReduxSaga } from '.';
import { currentUrl } from '../actions/common.actions';
import { ContentSection, MainLayout } from '../styles/layouts';
import '../styles/global';

export const DefaultPage = () => Page => {
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
          <ContentSection>
            <Page {...this.props} />
          </ContentSection>
        </MainLayout>
      );
    }
  }

  return DefaultPageHOC;
};
