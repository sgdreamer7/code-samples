import React from 'react';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import { ErrorText } from 'components/Form';

import { StyledCustomField } from './FormField.style';

export const FormField = ({ component: Component, size = 'sm', ...rest }) => (
  <Field {...rest}>
    {({ input, meta, ...rest }) => (
      <StyledCustomField size={size}>
        <Component
          input={input}
          {...rest}
          size="large"
          haserror={meta.error && meta.touched ? 1 : 0}
        />
        {meta.error && meta.touched && <ErrorText>{meta.error}</ErrorText>}
      </StyledCustomField>
    )}
  </Field>
);

FormField.propTypes = {
  component: PropTypes.func.isRequired,
};
