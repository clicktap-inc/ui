import { PropsWithChildren } from 'react';
import { StyledCard } from './styles';

export function Card({ children, ...props }: PropsWithChildren) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledCard {...props}>{children}</StyledCard>;
}
export default Card;
