import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import isEmail from 'validator/lib/isEmail';

import * as st from './RegistrationContainer.style';
import { Input, FormField, SubmitButton } from '../../components/Form';
import * as consts from '../../constants';

const validate = ({ email, password, confirmPassword }) => {
  const errors = {};
  const passwordRE = consts.common.password;

  if (!email) {
    errors.email = consts.errors.required;
  } else if (!isEmail(email)) {
    errors.email = consts.errors.emailNotCorrect;
  }

  if (!password) {
    errors.password = consts.errors.required;
  } else if (!passwordRE.test(password)) {
    errors.password = consts.errors.passwordNotCorrect;
  }

  if (!confirmPassword) {
    errors.confirmPassword = consts.errors.confirmPassword;
  } else if (password !== confirmPassword) {
    errors.confirmPassword = consts.errors.confirmPasswordNotMatch;
  }

  return errors;
};

export class RegistrationContainer extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      signup: PropTypes.func.isRequired,
    }),
    processing: PropTypes.bool.isRequired,
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
