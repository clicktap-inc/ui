import { FlexItemProps, FlexProps } from './flex.props';
import { StyledFlex, StyledFlexItem } from './flex.styles';

function Flex({ children, display = 'flex', ...rest }: FlexProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledFlex display={display} {...rest}>
      {children}
    </StyledFlex>
  );
}

function Item({ children, ...rest }: FlexItemProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledFlexItem {...rest}>{children}</StyledFlexItem>;
}

Flex.Item = Item;

// export { Flex, Item as FlexItem };
export { Flex };

export default Flex;
