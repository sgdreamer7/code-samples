import { Button } from 'antd';
import styled from 'styled-components';

import { COLORS } from 'styles';

export const StyledButton = styled(Button)`
  height: 40px;
  width: 120px;
  background-color: ${COLORS.BLUE_500};
  color: ${COLORS.WHITE};
  border-radius: 6px;
`;
