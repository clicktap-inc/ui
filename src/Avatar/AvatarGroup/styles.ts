import { styled } from 'styled-components';
import { AvatarGroup } from '@nextui-org/avatar';
import { AvatarGroupProps } from './types';

export const Root = styled(AvatarGroup)<AvatarGroupProps>`
  display: ${({ isGrid }) => (isGrid ? 'inline-grid' : 'flex')};
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  gap: ${({ isGrid }) => (isGrid ? '0.75rem' : '0')};
`;

export default Root;
