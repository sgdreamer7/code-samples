import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Router from 'next/router';
import axios from 'axios';

import { LoginContainer } from '../containers/index';
import * as st from './../styles/defaultPageStyles';
import { CookieService, DefaultPage, redirectTo, ApiService } from './../utils';
import { COOKIE_TOKEN_KEY } from './../config';
import { authActions, userActions } from 'actions';

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
      const token = req.query.token;
      console.log('token --> ', token);
      if (!token) throw new Error('Can\'t find token.');
      const { data } = await axios.get();
      CookieService.setCookie(COOKIE_TOKEN_KEY, token);
    } catch (e) {

    }
  }

  render() {
    return (
      <st.LoginPageWrapper>
        <LoginContainer {...this.props} />
      </st.LoginPageWrapper>
    );
  }
}
