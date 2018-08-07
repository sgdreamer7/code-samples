import React from 'react';
import PropTypes from 'prop-types';
import { UserPhoto } from './Users.style';

export const Users = ({ users }) => (
  <React.Fragment>
    {users.map(src => <UserPhoto src={src} key={src} />)}
  </React.Fragment>
);

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
};
