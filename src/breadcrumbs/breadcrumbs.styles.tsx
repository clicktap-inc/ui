import styled from 'styled-components';
import type { BreadcrumbsItemProps } from './breadcrumbs.props';

export const BreadcrumbsRoot = styled.nav`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const BreadcrumbsList = styled.ol`
  align-items: center;
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const BreadcrumbsItem = styled.li<BreadcrumbsItemProps>`
  display: flex;
  align-items: center;
`;

export const BreadcrumbsSeparator = styled.li<BreadcrumbsItemProps>`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;
