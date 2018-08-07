import React from 'react';
import PropTypes from 'prop-types';
import { Text, SubText } from './TextContent.style';

export const TextContent = ({ text, subText }) => (
  <React.Fragment>
    <Text>{text}</Text>
    <SubText>{subText}</SubText>
  </React.Fragment>
);

TextContent.propTypes = {
  text: PropTypes.string.isRequired,
  subText: PropTypes.string,
};
