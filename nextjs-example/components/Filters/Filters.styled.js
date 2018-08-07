import styled from 'styled-components';
import COLORS from '../../styles/colors';

export const FiltersWrap = styled.div`
  width: 950px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 10px;
  background: ${COLORS.WHITE};
  box-shadow: 0 0 20px 0 ${COLORS.SHADOW};
`;

export const FiltersClose = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url(/static/img/icomoon-icons/close.svg);
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
`;

export const FiltersSection = styled.div`
  padding-bottom: 20px;
`;

export const FiltersSectionHeader = styled.p`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 40px;
  font-size: 16px;
  color: ${COLORS.GRAY_400};
`;

export const FiltersContacts = styled.div`
  width: 350px;
`;

export const FiltersContactItem = styled.div`
  display: inline-flex;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ active }) => (active ? COLORS.BLUE_500 : COLORS.INVISIBLE)};
  border-radius: 100%;
  margin-right: 6px;
  margin-bottom: 6px;
  cursor: pointer;
  &:hover {
    border-color: ${COLORS.BLUE_500}
  }
`;

export const FiltersList = styled.ul`
  display: ${({ flexWrap }) => (flexWrap ? 'flex' : 'inherit')};
  flex-wrap: wrap;
`;

export const FiltersListItem = styled.li`
  width: 158px;
  margin-bottom: 5px;
  margin-right: 20px;
  font-size: 14px;
  color: ${COLORS.BLUE_500};
`;

export const FiltersListItemWrap = styled.span`
  min-height: 20px;
  padding-left: 10px;
  padding-right: 10px;
  position: relative;
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? COLORS.GRAY_800 : COLORS.WHITE)};
  
  &:before {
    content: '';
    width: 16px;
    height: 16px;
    background: url(/static/img/icomoon-icons/close-fill.svg);
    display: ${({ active }) => (active ? 'inline-block' : 'none')};
    position: absolute;
    right: -20px;
    color: ${COLORS.GRAY_500};
  }
`;

export const FiltersListItemCount = styled.span`
  padding-left: 10px;
  color: ${COLORS.GRAY_500};
`;
