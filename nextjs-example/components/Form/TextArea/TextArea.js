import { StyledTextArea } from './TextArea.style';

export const TextArea = ({ size = 'large', ...rest }) => <StyledTextArea size={size} {...rest} />;
