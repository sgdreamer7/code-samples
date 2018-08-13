export const userActions = {
  REQUEST: '@@user/REQUEST',
  SIGN_IN_FULFILED: '@@user/SIGN_IN_FULFILED',
  SIGN_IN_ERROR: '@@user/IGN_IN_ERROR',
  CLEAR_ERROR: '@@user/CLEAR_ERROR',

  signIn: user => ({
    type: userActions.REQUEST,
    payload: {
      data: user,
      method: 'post',
      url: '/api/user/signIn',
      sucess: userActions.signInFulfilled,
      error: userActions.signInError
    }
  }),
  signInFulfilled: resp => ({
    type: userActions.SIGN_IN_FULFILED,
    payload: {resp}
  }),
  signInError: error => ({
    type: userActions.SIGN_IN_ERROR,
    payload: {error}
  }),
  clearError: () => ({
    type: userActions.CLEAR_ERROR
  })
}
