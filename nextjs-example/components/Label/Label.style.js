import styled from 'styled-components';
import { COLORS } from '../../styles';

export const LabelStyled = styled.span`
  padding: 4px 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${COLORS.GRAY_780};
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  color: ${props => props.color || COLORS.GRAY_400};
`;
