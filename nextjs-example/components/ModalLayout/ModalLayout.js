import PropTypes from 'prop-types';
import { ModalLayoutOverlay, ModalLayoutEmbedded, ModalLayoutWrap, ModalLayoutCenter } from './ModalLayout.styled';

const layoutType = {
  embedded: ModalLayoutEmbedded,
  center: ModalLayoutCenter,
};

export const ModalLayout = ({
  onClose,
  type = 'embedded',
  open = false,
  overlay = false,
  children,
}) => {
  const ModalLayoutContent = layoutType[type];
  return (
    <ModalLayoutWrap open={open}>
      <ModalLayoutContent>{children}</ModalLayoutContent>
      {overlay && <ModalLayoutOverlay onClick={onClose} />}
    </ModalLayoutWrap>
  );
};

ModalLayout.propTypes = {
  type: PropTypes.oneOf(Object.keys(layoutType)),
  open: PropTypes.bool,
  overlay: PropTypes.bool,
  closeIcon: PropTypes.string,
};
