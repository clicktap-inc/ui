import { LinkProps } from 'react-aria-components';
import { StyledBreadcrumbLink } from './styles';

export function BreadcrumbLink(props: LinkProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledBreadcrumbLink {...props} />;
}

export default BreadcrumbLink;
