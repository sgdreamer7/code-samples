import React from 'react'; // eslint-disable-line
import Router from 'next/router';// eslint-disable-line
import axios from 'axios';

import { COOKIE_TOKEN_KEY, TOKEN_KEY } from './../config';
import { CookieService } from './';
import { removeToken, redirectTo } from './CommonUtils';
import { userActions } from './../actions';

export const RequireAuth = () => (Page) => {
  class AuthPage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
      };
    }

    static async getInitialProps(ctx) {
      try {
        let token;
        const { browser } = process;
        if (browser) {
          token = CookieService.getFromLocalCookie(COOKIE_TOKEN_KEY);
        } else {
          token = CookieService.getFromServerCookie(ctx.req, COOKIE_TOKEN_KEY);
        }
        // CHECK JWT TOKEN AND GET USER DATA FROM GOOGLE API
        const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);

        // PUT DATA TO THE STORE ONCE IT HAPPENS ON THE SERVER
        if (!browser) ctx.store.dispatch(userActions.updateUser(data));
        const pageProps = Page.getInitialProps && await Page.getInitialProps(ctx);
        return { ...pageProps };
      } catch (e) {
        redirectTo('/login', ctx.res);
        return {};
      }
    }

    componentWillMount() {
      if (process.browser) {
        window.addEventListener('storage', this.handleChangeLs, false);
      }
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.handleChangeLs, false);
    }

    componentDidMount() {
      this.setState({ isLoading: false });
    }

    handleChangeLs = (e) => {
      if (e.key === TOKEN_KEY && _.isNil(e.newValue)) {
        Router.push('/login');
        removeToken();
      }
    };

    render() {
      const { isLoading } = this.state;

      if (isLoading) return <div>Loading...</div>;
      return (
        <Page {...this.props} />
      );
    }
  }

  return AuthPage;
};
