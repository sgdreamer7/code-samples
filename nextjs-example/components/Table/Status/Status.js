import React from 'react';
import PropTypes from 'prop-types';
import { COLORS } from '../../../styles/index';
import { Label } from '../../Label/Label';

const statusColor = new Map()
  .set('Fired', COLORS.BLACK)
  .set('Accepted', COLORS.BLUE_500)
  .set('Interns', COLORS.BLUE_700)
  .set('Interview', COLORS.MAGENTA_300)
  .set('New', COLORS.GREEN_500)
  .set('NotHire', COLORS.RED_500)
  .set('Hire', COLORS.MAGENTA_500)
  .set('Hired', COLORS.MAGENTA_500)
  .set('Reserve', COLORS.YELLOW_400)
  .set('Test', COLORS.BLUE_300);

export const Status = ({ status, title }) => (
  <Label color={statusColor.get(status)}>{title}</Label>
);

Status.propTypes = {
  title: PropTypes.oneOf(Array.from(statusColor.keys())).isRequired,
  status: PropTypes.oneOf(Array.from(statusColor.keys())).isRequired,
};
