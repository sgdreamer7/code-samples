import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import isEmail from 'validator/lib/isEmail';

import * as st from './RegistrationContainer.style';
import { Input, FormField, SubmitButton } from '../../components/Form';

const validate = ({ email, password, confirmPassword }) => {
  const errors = {};
  const passwordRE = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (!email) {
    errors.email = 'Email is required';
  } else if (!isEmail(email)) {
    errors.email = 'Email is not correct';
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (!passwordRE.test(password)) {
    errors.password = 'Password must contain at least 6 characters, one number, one lowecase and one uppercase letter';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must coincide';
  }

  return errors;
};

export class RegistrationContainer extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      signup: PropTypes.func.isRequired,
    }),
  }

  onSubmit = (authData) => {
    this.props.actions.signup(authData);
  }

  render() {
    const { processing } = this.props;
    return (
      <Form onSubmit={this.onSubmit} validate={validate} render={({ handleSubmit }) => (
        <st.RegistrationFormCard>
          <form onSubmit={handleSubmit}>
            <FormField
              name="email"
              placeholder="Email"
              component={Input}
            />
            <FormField
              name="password"
              placeholder="Password"
              type="password"
              component={Input}
            />
            <FormField
              name="confirmPassword"
              placeholder="Confirm password"
              type="password"
              component={Input}
            />
            <st.SubmitButtonWrapper>
              <SubmitButton type="primary" htmlType="submit" onClick={handleSubmit} loading={processing}>Registration</SubmitButton>
            </st.SubmitButtonWrapper>
          </form>
        </st.RegistrationFormCard>
      )} />
    );
  }
}
