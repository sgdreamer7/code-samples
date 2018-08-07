import store from 'store';
import Router from 'next/router';

import { CookieService } from './';
import { TOKEN_KEY } from './../config';

export const generateArray = (len = 10, cb) => Array
  .from(Array(len).keys())
  .map((_, index) => (cb ? cb(index) : index));

export const removeToken = () => {
  store.remove(TOKEN_KEY);
  CookieService.unsetToken(TOKEN_KEY);
};

export const redirectTo = (path, res) => {
  if (!process.browser) {
    res.writeHead(302, { Location: path });
    res.end();
  } else {
    Router.replace(path);
  }
};
