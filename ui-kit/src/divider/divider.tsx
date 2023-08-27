import { DividerProps } from './divider.props';
import {
  DividerLine,
  DividerWrapper,
  DividerLineWrapper,
  DividerOverlay,
} from './divider.styles';

export function Divider({ children, ...props }: DividerProps) {
  const { color, overlayX, overlay } = props;
  return (
    <DividerWrapper>
      <DividerLineWrapper>
        <DividerLine color={color} />
      </DividerLineWrapper>
      {overlay && (
        <DividerOverlay overlayX={overlayX}>{overlay}</DividerOverlay>
      )}
    </DividerWrapper>
  );
}

Divider.defaultProps = {
  overlayX: 'center',
  color: 'red-600',
};

export default Divider;
