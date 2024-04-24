import { LinkProps } from 'react-aria-components';
import { Root } from './styles';

export function Link({ children, ...props }: LinkProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Root {...props}>{children}</Root>;
}

export default Link;
