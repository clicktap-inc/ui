import { TabPanelProps, TabPanel as AriaTabPanel } from 'react-aria-components';
import { cn } from '../utils';

export function TabPanel({ children, className, ...props }: TabPanelProps) {
  return (
    <AriaTabPanel
      className={cn('flex grow py-4 px-0', className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </AriaTabPanel>
  );
}

export default TabPanel;
