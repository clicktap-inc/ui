import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { TabList } from './TabList';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';

const meta: Meta<typeof Tabs> = { component: Tabs };
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Example: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab id="details">Details</Tab>
        <Tab id="reviews">Reviews</Tab>
      </TabList>
      <TabPanel id="details">Product details go here.</TabPanel>
      <TabPanel id="reviews">Customer reviews go here.</TabPanel>
    </Tabs>
  ),
};
