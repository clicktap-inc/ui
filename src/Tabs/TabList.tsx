import { useContext } from 'react';
import { StyledTabList, StyledTab } from './styles';
import { TabListProps } from './types';
import { TabsOrientationContext } from './Tabs';

export function TabList({
  items,
  children,
  variant = 'base',
  ...props
}: TabListProps) {
  const orientation = useContext(TabsOrientationContext);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledTabList items={items} variant={variant} {...props}>
      {children ||
        ((item) => (
          <StyledTab orientation={orientation}>{item.title}</StyledTab>
        ))}
    </StyledTabList>
  );
}

export default TabList;
