import { TabPanelProps } from 'react-aria-components';
import { StyledTabPanel } from './styles';

export function TabPanel({ children, ...props }: TabPanelProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledTabPanel {...props}>{children}</StyledTabPanel>;
}

export default TabPanel;
