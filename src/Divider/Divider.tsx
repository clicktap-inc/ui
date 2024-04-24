import { useSeparator, SeparatorProps } from 'react-aria';
import { Root } from './styles';

export function Divider(props: SeparatorProps) {
  const { orientation } = props;
  const { separatorProps } = useSeparator(props);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Root {...separatorProps} orientation={orientation} />;
}

export default Divider;
