import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import * as st from './LoginContainer.style';
import { Input, FormField, SubmitButton, Validators } from '../../components/Form';

export class LoginContainer extends React.Component {
  static propTypes = {
    actions: PropTypes.shape({
      login: PropTypes.func.isRequired,
    }),
  }

  onSubmit = (authData) => {
    console.log(this.props);
    this.props.actions.login(authData);
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} render={({ handleSubmit }) => (
        <st.LoginFormCard>
          <form onSubmit={handleSubmit}>
            <FormField
              name="email"
              validate={Validators.isEmail()}
              placeholder="Email"
              component={Input}
            />
            <FormField
              name="password"
              validate={Validators.required()}
              placeholder="Пароль"
              type="password"
              component={Input}
            />
            <st.SubmitButtonWrapper>
              <SubmitButton type="primary" htmlType="submit" onClick={handleSubmit}>Вход</SubmitButton>
            </st.SubmitButtonWrapper>
          </form>
        </st.LoginFormCard>
      )} />
    );
  }
}
