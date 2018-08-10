import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { authActions } from '../actions';
import { LoginContainer } from '../containers/index';
import * as st from '../styles/defaultPageStyles';
import { CookieService, DefaultPage } from '../utils';
import { COOKIE_TOKEN_KEY } from '../config';

@DefaultPage()
@connect(
  state => ({
    processing: state.auth.processing,
  }),
  dispatch => ({ actions: bindActionCreators(authActions, dispatch) }),
)
export default class Login extends React.Component {
  static async getInitialProps({ isServer, req }) {
    try {
      const { token } = req.query;
      console.log('token --> ', token);
      if (!token) throw new Error("Can't find token.");
      const { data } = await axios.get();
      CookieService.setCookie(COOKIE_TOKEN_KEY, token);
    } catch (e) {}
  }

  render() {
    return (
      <st.AuthContainer>
        <LoginContainer {...this.props} />
      </st.AuthContainer>
    );
  }
}
