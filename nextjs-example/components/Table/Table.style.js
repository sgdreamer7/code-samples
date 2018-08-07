import styled from 'styled-components';
import { Table } from 'antd';
import { COLORS } from '../../styles';

export const TableStyled = styled(Table)`  
  .ant-table {
    font-family: 'Source Sans Pro';
  }
 
  .ant-table-thead > tr > th {
    height: 36px;
    padding: 0 4px;
    background: ${COLORS.WHITE};
    border-bottom: none;
  }
 
  .ant-table-thead > tr > th span {
    padding: 4px 6px;
    border-radius: 4px;
    color: ${COLORS.GRAY_500};
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;
  }
  
  .ant-table-thead > tr > th.highlight-off span {
    cursor: default;
  }
 
  .ant-table-thead > tr > th.sorted span,
  .ant-table-thead > tr > th:not(.highlight-off) span:hover {
    background: ${COLORS.GRAY_800};
  }
 
  .ant-table-thead>tr.ant-table-row-hover>td,
  .ant-table-thead>tr:hover>td,
  .ant-table-tbody>tr.ant-table-row-hover>td,
  .ant-table-tbody>tr:hover>td {
    background: ${COLORS.GRAY_800};
  }
  
  .ant-table-tbody>tr.ant-table-row-hover>td,
  .ant-table-tbody>tr>td {
    padding: 0 10px;
    height: 76px;
  }
`;
