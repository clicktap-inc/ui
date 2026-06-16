import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './index';

const meta: Meta<typeof Accordion> = { component: Accordion };
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Example: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem key="shipping" aria-label="Shipping" title="Shipping">
        Free shipping on orders over $50.
      </AccordionItem>
      <AccordionItem key="returns" aria-label="Returns" title="Returns">
        30-day return policy on unused items.
      </AccordionItem>
    </Accordion>
  ),
};

// `selectionMode="multiple"` lets several items stay open at once;
// `defaultExpandedKeys` opens some on mount.
export const MultipleOpen: Story = {
  render: () => (
    <Accordion selectionMode="multiple" defaultExpandedKeys={['shipping']}>
      <AccordionItem key="shipping" aria-label="Shipping" title="Shipping">
        Free shipping on orders over $50.
      </AccordionItem>
      <AccordionItem key="returns" aria-label="Returns" title="Returns">
        30-day return policy on unused items.
      </AccordionItem>
      <AccordionItem key="warranty" aria-label="Warranty" title="Warranty">
        2-year limited manufacturer warranty.
      </AccordionItem>
    </Accordion>
  ),
};
