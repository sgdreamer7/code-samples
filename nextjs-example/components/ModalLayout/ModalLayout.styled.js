import styled from 'styled-components';

export const ModalLayoutWrap = styled.div`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
`;

export const ModalLayoutEmbedded = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
`;

export const ModalLayoutCenter = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
`;

export const ModalLayoutOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $overlay-color;
  z-index: index(popup-overlay);
`;
