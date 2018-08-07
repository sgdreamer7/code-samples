import PropTypes from 'prop-types';
import { UserImg, UserName, UserWrapp } from './User.styled';

export const User = ({ img, name }) => (
  <UserWrapp>
    {img && <UserImg src={img} alt={name} />}
    {name && <UserName>{name}</UserName>}
  </UserWrapp>
);

User.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
};
