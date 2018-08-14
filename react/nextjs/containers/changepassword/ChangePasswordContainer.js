import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import Link from 'next/link';
import { message } from 'antd';

import * as st from './ChangePasswordContainer.style';
import { Input, FormField, SubmitButton } from '../../components/Form';
import { errorsConst, commonConst } from '../../constants';

const validate = ({ password, confirmPassword }) => {
  const {
    REQUIRED_FIELD,
    PASSWORD_NOT_CORRECT,
    CONFIRM_PASSWORD,
    CONFIRM_PASSWORD_NOT_MATCH,
  } = errorsConst;
  const { PASSWORD_REGEXP } = commonConst;

  const errors = {};

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

export class ChangePasswordContainer extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      changePassword: PropTypes.func.isRequired,
    }),
    processing: PropTypes.bool.isRequired,
  };

  state = {
    isPasswordChanged: false,
    error: null,
  };

  componentDidUpdate() {
    const { error } = this.state;
    if (error) {
      message.error(error);
    }
  }

  onChangePasswordSuccess = () => {
    this.setState({ isPasswordChanged: true, error: null });
  };

  onChangePasswordError = error => {
    this.setState({ error });
  };

  onSubmit = data => {
    const { actions } = this.props;
    actions.changePassword(
      data,
      this.onChangePasswordSuccess,
      this.onChangePasswordError,
    );
  };

  render() {
    const { processing } = this.props;
    const { isPasswordChanged } = this.state;
    if (isPasswordChanged) {
      return (
        <st.ChangePasswordFormCard>
          <st.Msg>
            Your password was changed. Please go to the{' '}
            <Link href="/login">
              <a>login</a>
            </Link>{' '}
            page and try to login using new password
          </st.Msg>
        </st.ChangePasswordFormCard>
      );
    }
    return (
      <Form
        onSubmit={this.onSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <st.ChangePasswordFormCard>
            <form onSubmit={handleSubmit}>
              <FormField
                name="password"
                placeholder="New Password"
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
                  Change
                </SubmitButton>
              </st.SubmitButtonWrapper>
            </form>
          </st.ChangePasswordFormCard>
        )}
      />
    );
  }
}
