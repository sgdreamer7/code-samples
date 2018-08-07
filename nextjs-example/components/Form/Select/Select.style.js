import styled from 'styled-components';
import { SelectBindings } from 'components/Form';
import { COLORS } from 'styles';

export const StyledSelect = styled(SelectBindings)`
    width: 250px!important;
    .ant-select-selection {
      border-color: ${({ hasError }) => (hasError ? COLORS.RED_500 : COLORS.GRAY_750)};
    }
`;
