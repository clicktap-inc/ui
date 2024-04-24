import { StyledBreadcrumbs } from './styles';
import { BreadcrumbsProps } from './types';

export function Breadcrumbs({ children, ...props }: BreadcrumbsProps<object>) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledBreadcrumbs {...props}>{children}</StyledBreadcrumbs>
  );
}

export default Breadcrumbs;
