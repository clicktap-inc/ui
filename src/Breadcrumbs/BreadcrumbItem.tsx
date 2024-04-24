import { BreadcrumbProps } from 'react-aria-components';
import { StyledBreadcrumbItem } from './styles';

export function BreadcrumbItem({ children, ...props }: BreadcrumbProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledBreadcrumbItem {...props}>{children}</StyledBreadcrumbItem>
  );
}

export default BreadcrumbItem;
