import styled from 'styled-components';
import COLORS from '../../styles/colors';

export const SidebarLayout = styled.aside`
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
export const LogoWrapp = styled.div`
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Logo = styled.img`
  width: 182px;
  height: 32px;
`;
export const MenuWrapp = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-basis: 0;
  flex-grow: 1;
`;
export const MenuList = styled.ul`
  margin-left: ${({ last }) => (last ? '24px' : '66px')};
  margin-bottom: ${({ last }) => (last ? '40px' : '')};
`;
export const MenuListItem = styled.li`
  height: 30px;
  margin-bottom: 12px;
  line-height: 1.5;
  cursor: pointer;
`;
export const MenuLink = styled.a`
  transition: unset;
  color: ${({ active }) => (active ? COLORS.BLACK_500 : COLORS.GRAY_500)};
  
  &:hover {
    color: ${COLORS.GRAY_400};
  }
`;
export const Logout = styled.span`
  padding-left: 43px;
  color: ${COLORS.BLUE_500};
  cursor: pointer;
`;
