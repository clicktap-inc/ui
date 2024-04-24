import { TabsProps } from 'react-aria-components';
import { createContext } from 'react';
import { StyledTabs } from './styles';

export const TabsOrientationContext =
  createContext<TabsProps['orientation']>('horizontal');

export function Tabs({ children, ...props }: TabsProps) {
  return (
    <TabsOrientationContext.Provider value={props.orientation ?? 'horizontal'}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <StyledTabs {...props}>{children}</StyledTabs>
    </TabsOrientationContext.Provider>
  );
}

export default Tabs;
