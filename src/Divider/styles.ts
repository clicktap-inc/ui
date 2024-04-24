import styled from 'styled-components';
import { SeparatorProps } from 'react-aria';

export const Root = styled.div<{ orientation: SeparatorProps['orientation'] }>`
  width: ${({ orientation }) => (orientation === 'vertical' ? '1px' : '100%')};
  height: ${({ orientation }) => (orientation === 'vertical' ? 'auto' : '1px')};
  margin: ${({ orientation }) =>
    orientation === 'vertical' ? '0 1rem' : '1rem 0'};
  background: ${({ theme }) => theme.colors?.slate?.[200]};
`;

export default Root;
