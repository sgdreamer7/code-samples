import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
import { Layout } from 'antd';
import COLORS from './colors';

export const MainContainer = styled.div`
  display: flex;
  flex-shrink: 1;
`;

export const MainWrapper = styled.div`
  flex: 1;
  padding: 0 87px;
  overflow-y: auto;
`;

export const AuthContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 485px;
`;

export const PageWrapper = styled.div`
  flex: 1;
`;

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const LoginPageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LayoutContent = styled(Layout.Content)`
  position: relative;
`;
