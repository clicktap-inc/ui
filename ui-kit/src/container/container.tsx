import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';
import { ContainerProps } from './container.props';
import { StyledContainer } from './container.styles';

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
