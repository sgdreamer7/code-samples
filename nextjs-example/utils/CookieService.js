import Cookie from 'js-cookie';
import axios from 'axios';
import { COOKIE_TOKEN_KEY } from './../config';

const TOKENS = Symbol('tokens');

export class CookieService {
  static [TOKENS] = ['jwt', 'refresh_token', 'refresh_token_expired'];

  static setCookie(key, value, exp) {
    if (!process.browser) return; /* SET UP COOKIES ONLY IN BROWSER */
    Cookie.set.call(null, key, value, exp ? { expires: exp } : null);
  }

  static getFromLocalCookie = key => Cookie.getJSON(key);

  static getFromServerCookie = (req, key) => {
    if (!req.headers.cookie) return '';
    const jwtCookie = req.headers.cookie.split(';');
    const siteCookie = jwtCookie.find(item => item.trim().slice(0, key.length) === key);
    if (!siteCookie) return '';

    return jwtCookie
      .find(c => c.trim().startsWith(key))
      .split('=')[1];
  };

  static clear(key, { isServer = false, res } = {}) {
    if (isServer) {
      res.clearCookie(key);
    } else {
      Cookie.remove(key);
    }
  }

  static async checkToken({ req, isServer }) {
    const token = isServer
      ? this.getFromServerCookie(req, COOKIE_TOKEN_KEY)
      : this.getFromLocalCookie(COOKIE_TOKEN_KEY);
    return axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`);
  }
}
