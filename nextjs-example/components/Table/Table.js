import React from 'react';
import PropTypes from 'prop-types';
import { TableStyled } from './Table.style';

export const Table = ({ columns, data }) => (
  <TableStyled
    pagination={false}
    rowKey='id'
    columns={columns}
    dataSource={data}
  />
);

Table.propTypes = {
  data: PropTypes.any.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    title: PropTypes.string,
    align: PropTypes.string,
    onHeaderCell: PropTypes.func,
  })),
};
