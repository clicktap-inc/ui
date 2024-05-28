import { styled } from 'styled-components';
import { defaultTheme } from '../defaultTheme';

export const Root = styled.div`
  width: 100%;
  height: 1px;
  margin: 1rem 0;
  background: ${({ theme }) =>
    theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};

  &[aria-orientation='vertical'] {
    width: 1px;
    height: 100%;
    margin: 0 1rem;
  }
`;

export default Root;
