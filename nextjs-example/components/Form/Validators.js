import validator from 'validator';

const clear = (value, fn) => (value ? fn(value) : undefined);

export const required = (msg = 'Required') => value => (value ? undefined : msg);
export const isEmail = (msg = 'Email is not correct') =>
  value => clear(
    value,
    value => (!validator.isEmail(value) ? msg : undefined),
  );
export const compose = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
