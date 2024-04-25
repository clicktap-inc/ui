import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { StyledContainer } from './styles';
import { ContainerProps } from './types';

export const Container = forwardRef(
  (
    { children, ...props }: ContainerProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <StyledContainer {...props} ref={ref}>
        {children}
      </StyledContainer>
    );
  }
);

export default Container;
