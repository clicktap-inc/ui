import { TabsProps } from 'react-aria-components';
import { LayoutGroup } from 'framer-motion';
import { createContext, useId } from 'react';
import { StyledTabs } from './styles';

export const TabsOrientationContext =
  createContext<TabsProps['orientation']>('horizontal');

export function Tabs({ children, ...props }: TabsProps) {
  const id = useId();

  return (
    <TabsOrientationContext.Provider value={props.orientation ?? 'horizontal'}>
      <LayoutGroup id={id}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <StyledTabs {...props}>{children}</StyledTabs>
      </LayoutGroup>
    </TabsOrientationContext.Provider>
  );
}

export default Tabs;
