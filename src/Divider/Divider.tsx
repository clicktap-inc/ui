import { useSeparator } from 'react-aria';
import { DividerProps } from './types';
import { Root } from './styles';

export function Divider(props: DividerProps) {
  const { separatorProps } = useSeparator(props);
  const combinedProps = { ...props, ...separatorProps };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Root {...combinedProps} />;
}

export default Divider;
