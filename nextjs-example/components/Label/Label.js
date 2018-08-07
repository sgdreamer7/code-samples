import PropTypes from 'prop-types';

import { LabelStyled } from './Label.style';

export const Label = ({ color, children }) =>
  <LabelStyled color={color}>{children}</LabelStyled>;

Label.propTypes = {
  color: PropTypes.string,
};
