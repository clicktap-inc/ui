import { useSeparator } from 'react-aria';
import { DividerProps } from './types';
import { Root } from './styles';

export function Divider({
  orientation = 'horizontal',
  ...props
}: DividerProps) {
  const { separatorProps } = useSeparator({ ...props, orientation });
  const combinedProps = { ...props, ...separatorProps };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Root {...combinedProps} orientation={orientation} />;
}

export default Divider;
