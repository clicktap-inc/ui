import { StyledBreadcrumbSeparator } from './styles';
import { BreadcrumbItemProps } from './types';

export function BreadcrumbSeparator({
  children,
  ...props
}: BreadcrumbItemProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledBreadcrumbSeparator {...props}>
      {children ?? (
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M6 12L10 8L6 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </StyledBreadcrumbSeparator>
  );
}

export default BreadcrumbSeparator;
