import styled from 'styled-components';

export const StyledCustomField = styled.div`
  height: 57px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: ${({ size }) => (size === 'sm' ? '250px' : '80%')};
  .ant-form-item,
  .ant-input {
    margin-bottom: 3px;
  }
`;
