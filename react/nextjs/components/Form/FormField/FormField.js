import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { ErrorText } from 'components/Form';

import { StyledCustomField } from './FormField.style';

export const FormField = ({ component: Component, size = 'sm', ...rest }) => (
  <Field {...rest}>
    {({ input, meta, ...rest }) => (
      <StyledCustomField size={size}>
        <Component input={input} {...rest} size='large' hasError={meta.error && meta.touched} />
        {meta.error && meta.touched && <ErrorText>{meta.error}</ErrorText>}
      </StyledCustomField>
    )}
  </Field>
);

FormField.propTypes = {
  component: PropTypes.func.isRequired,
};
