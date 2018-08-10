import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import * as st from './ForgotPasswordContainer.style';
import {
  Input,
  FormField,
  SubmitButton,
  Validators,
} from '../../components/Form';

export class ForgotPasswordContainer extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      resetPassword: PropTypes.func.isRequired,
      clearResetPassword: PropTypes.func.isRequired,
      clearError: PropTypes.func.isRequired,
    }),
    processing: PropTypes.bool.isRequired,
    isPasswordReset: PropTypes.bool.isRequired,
  };

  componentWillUnmount() {
    const {
      actions: { clearResetPassword, clearError },
    } = this.props;
    clearResetPassword();
    clearError();
  }

  onSubmit = email => {
    const { actions } = this.props;
    actions.resetPassword(email);
  };

  render() {
    const { processing, isPasswordReset } = this.props;
    if (isPasswordReset) {
      return (
        <st.ForgotPasswordFormCard>
          <st.Msg>Check your email</st.Msg>
        </st.ForgotPasswordFormCard>
      );
    }
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit }) => (
          <st.ForgotPasswordFormCard title="Forgot your password?">
            <st.HeaderWrapper>Please write your email</st.HeaderWrapper>
            <form onSubmit={handleSubmit}>
              <FormField
                name="email"
                validate={Validators.required()}
                placeholder="Email"
                component={Input}
              />
              <st.SubmitButtonWrapper>
                <SubmitButton
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                  loading={processing}>
                  Submit
                </SubmitButton>
              </st.SubmitButtonWrapper>
            </form>
          </st.ForgotPasswordFormCard>
        )}
      />
    );
  }
}
