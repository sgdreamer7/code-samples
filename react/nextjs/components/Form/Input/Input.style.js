import styled from 'styled-components';
import { COLORS } from 'styles';
import { Input } from 'antd';

export const StyledInput = styled(Input)`
  margin-bottom: 25px;
  border-radius: 4px;
  border-color: ${({ haserror }) =>
    haserror ? COLORS.RED_500 : COLORS.GRAY_750};
`;
