import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import isEmail from 'validator/lib/isEmail';
import { message } from 'antd';

import * as st from './RegistrationContainer.style';
import { Input, FormField, SubmitButton } from '../../components/Form';
import { errorsConst, commonConst } from '../../constants';

const validate = ({ email, password, confirmPassword }) => {
  const {
    REQUIRED_FIELD,
    EMAIL_NOT_CORRECT,
    PASSWORD_NOT_CORRECT,
    CONFIRM_PASSWORD,
    CONFIRM_PASSWORD_NOT_MATCH,
  } = errorsConst;
  const { PASSWORD_REGEXP } = commonConst;

  const errors = {};

  if (!email) {
    errors.email = REQUIRED_FIELD;
  } else if (!isEmail(email)) {
    errors.email = EMAIL_NOT_CORRECT;
  }

  if (!password) {
    errors.password = REQUIRED_FIELD;
  } else if (!PASSWORD_REGEXP.test(password)) {
    errors.password = PASSWORD_NOT_CORRECT;
  }

  if (!confirmPassword) {
    errors.confirmPassword = CONFIRM_PASSWORD;
  } else if (password !== confirmPassword) {
    errors.confirmPassword = CONFIRM_PASSWORD_NOT_MATCH;
  }

  return errors;
};

export class RegistrationContainer extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      signup: PropTypes.func.isRequired,
    }),
    processing: PropTypes.bool.isRequired,
  };

  state = {
    error: null,
  };

  componentDidUpdate() {
    const { error } = this.state;
    if (error) {
      message.error(error);
    }
  }

  onSignupSuccess = () => {
    this.setState({ error: null });
  };

  onSignupError = error => {
    this.setState({ error });
  };

  onSubmit = authData => {
    const { actions } = this.props;
    actions.signup(authData, this.onSignupSuccess, this.onSignupError);
  };

  render() {
    const { processing } = this.props;
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <st.RegistrationFormCard>
            <form onSubmit={handleSubmit}>
              <FormField name="email" placeholder="Email" component={Input} />
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
                <SubmitButton
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                  loading={processing}>
                  Registration
                </SubmitButton>
              </st.SubmitButtonWrapper>
            </form>
          </st.RegistrationFormCard>
        )}
      />
    );
  }
}
