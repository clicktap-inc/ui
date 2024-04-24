import styled from 'styled-components';
import { Link, LinkProps } from 'react-aria-components';

export const Root = styled(Link)<LinkProps>`
  color: ${({ isDisabled, theme }) =>
    isDisabled ? theme.colors?.slate?.[300] : theme.colors?.slate?.[500]};
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  text-decoration: none;
  transition: 0.3s color;
  outline: none;

  &:hover {
    color: ${({ isDisabled, theme }) =>
      isDisabled ? theme.colors?.slate?.[300] : theme.colors?.slate?.[800]};
  }
`;

export default Root;
