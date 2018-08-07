import React from 'react';
import PropTypes from 'prop-types';
import { StyledSelect } from './Select.style';

export class Select extends React.PureComponent {
  static propTypes = {
    options: PropTypes.array.isRequired,
  }

  render() {
    const {
      options, input, size = 'large', ...rest
    } = this.props;
    return <StyledSelect
      {...rest}
      {...input}
      size={size}
      options={options}
    />;
  }
}
