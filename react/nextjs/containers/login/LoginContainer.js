import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import Link from 'next/link';
import { message } from 'antd';

import * as st from './LoginContainer.style';
import {
  Input,
  FormField,
  SubmitButton,
  Validators,
} from '../../components/Form';

export class LoginContainer extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      login: PropTypes.func.isRequired,
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

  onLoginSuccess = () => {
    this.setState({ error: null });
  };

  onLoginError = error => {
    this.setState({ error });
  };

  onSubmit = authData => {
    const { actions } = this.props;
    actions.login(authData, this.onLoginSuccess, this.onLoginError);
  };

  render() {
    const { processing } = this.props;
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit }) => (
          <st.LoginFormCard>
            <form onSubmit={handleSubmit}>
              <FormField
                name="email"
                validate={Validators.required()}
                placeholder="Email"
                component={Input}
              />
              <FormField
                name="password"
                validate={Validators.required()}
                placeholder="Password"
                type="password"
                component={Input}
              />
              <st.SubmitButtonWrapper>
                <SubmitButton
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                  loading={processing}>
                  Sign In
                </SubmitButton>
              </st.SubmitButtonWrapper>
              <st.LinksWrapper>
                <Link href="/registration">
                  <a>Click to register</a>
                </Link>
                <Link href="/forgotpassword">
                  <a>Forgot your password?</a>
                </Link>
              </st.LinksWrapper>
            </form>
          </st.LoginFormCard>
        )}
      />
    );
  }
}
