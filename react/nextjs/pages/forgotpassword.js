import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { authActions } from '../actions';
import {
  ForgotPasswordContainer,
  ChangePasswordContainer,
} from '../containers/index';
import * as st from '../styles/defaultPageStyles';
import { DefaultPage } from '../utils';

@DefaultPage()
@connect(
  state => ({
    processing: state.auth.processing,
    isPasswordReset: state.auth.isPasswordReset,
    isPasswordChanged: state.auth.isPasswordChanged,
  }),
  dispatch => ({ actions: bindActionCreators(authActions, dispatch) }),
)
export default class ForgotPassword extends React.Component {
  static propTypes = {
    token: PropTypes.string,
  };

  static async getInitialProps({ query }) {
    try {
      const { token } = query;
      if (!token) throw new Error("Can't find token.");
      if (token) return { token };
    } catch (error) {
      return { error };
    }
  }

  render() {
    const { token } = this.props;
    if (token) {
      return (
        <st.AuthContainer>
          <ChangePasswordContainer {...this.props} />
        </st.AuthContainer>
      );
    }

    return (
      <st.AuthContainer>
        <ForgotPasswordContainer {...this.props} />
      </st.AuthContainer>
    );
  }
}
