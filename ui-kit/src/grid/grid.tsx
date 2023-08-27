import { GridItemProps, GridProps } from './grid.props';
import { StyledGrid, StyledGridItem } from './grid.styles';

function Grid({ children, display = 'grid', ...rest }: GridProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledGrid display={display} {...rest}>
      {children}
    </StyledGrid>
  );
}

function Item({ children, ...rest }: GridItemProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledGridItem {...rest}>{children}</StyledGridItem>;
}

// is there any reason to do this?
// Grid.Item = Item;

export { Grid, Item as GridItem };

export default Grid;
