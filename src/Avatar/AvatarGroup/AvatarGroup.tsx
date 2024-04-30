import { PropsWithChildren } from 'react';
import { AvatarGroupProps } from './types';
import { Root } from './styles';

export function AvatarGroup({
  children,
  isGrid,
  renderCount,
}: PropsWithChildren<AvatarGroupProps>) {
  return (
    <Root isGrid={isGrid} max={0} renderCount={renderCount ?? undefined}>
      {children}
    </Root>
  );
}

export default AvatarGroup;
