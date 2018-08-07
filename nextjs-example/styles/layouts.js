import styled from 'styled-components';
import COLORS from './colors';

export const MainLayout = styled.main`
  display: flex;
  width: 1200px;
  min-height: 100vh;
  margin: 0 auto;
`;
export const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  flex-grow: 1;
`;
export const ContentHeader = styled.div`
  height: 90px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;
export const ContentLayout = styled.div`
  padding: 20px 25px;
  margin-bottom: 40px;
  border-radius: 6px;
  background-color: ${COLORS.WHITE};
  flex-basis: 0;
  flex-grow: 1;
`;
