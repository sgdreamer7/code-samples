import React from 'react';
import PropTypes from 'prop-types';
import { TextBlue, TextGray } from './ColorText.style';

export const ColorText = ({ text, subText }) => (
  <React.Fragment>
    <TextBlue>{text}</TextBlue>
    <TextGray>{subText}</TextGray>
  </React.Fragment>
);

ColorText.propTypes = {
  text: PropTypes.string.isRequired,
  subText: PropTypes.string,
};
