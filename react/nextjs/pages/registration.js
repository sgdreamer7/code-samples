import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authActions } from 'actions';
import { RegistrationContainer } from '../containers/index';
import * as st from '../styles/defaultPageStyles';
import { DefaultPage } from '../utils';

@DefaultPage()
@connect(
  state => ({
    processing: state.auth.processing,
  }),
  dispatch => ({ actions: bindActionCreators(authActions, dispatch) }),
)
export default class Registration extends React.Component {
  render() {
    return (
      <st.AuthContainer>
        <RegistrationContainer {...this.props} />
      </st.AuthContainer>
    );
  }
}
