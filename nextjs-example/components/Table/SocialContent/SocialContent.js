import React from 'react';
import PropTypes from 'prop-types';
import { Text, SubText, SocialWrap, SocialInfo } from './SocialContent.style';

export const SocialContent = ({ text, subText }) => (
  <SocialWrap>
    <span />
    <SocialInfo>
      <Text>{text}</Text>
      <SubText>{subText}</SubText>
    </SocialInfo>
  </SocialWrap>
);

SocialContent.propTypes = {
  text: PropTypes.string.isRequired,
  subText: PropTypes.string,
};
