import styled from 'styled-components';
import { Breadcrumbs, Breadcrumb, Link } from 'react-aria-components';

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0 0 1rem;
  padding: 0.3125rem 0 0;
  font-size: 0.9rem;
`;

export const StyledBreadcrumbItem = styled(Breadcrumb)`
  display: flex;
  align-items: center;
`;

export const StyledBreadcrumbSeparator = styled(Breadcrumb)`
  display: flex;
  align-items: center;
  margin: 0 0.5rem;
  color: ${({ theme }) => theme.colors.slate[600]};

  > svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const StyledBreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.slate[600]};
  text-decoration: none;
  cursor: pointer;

  &:not([data-focus-visible='true']) {
    outline: none;
  }
  &[data-hovered] {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.slate[900]};
  }

  &[data-current] {
    font-weight: 600;
    cursor: default;
    color: ${({ theme }) => theme.colors.slate[900]};
  }

  &[data-disabled] {
    cursor: default;

    &:not([data-current]) {
      color: ${({ theme }) => theme.colors.slate[400]};
    }
  }
`;
