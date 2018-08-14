import * as st from './Input.style';

export const Input = ({ input, ...rest }) => (
  <st.StyledInput {...input} {...rest} />
);
