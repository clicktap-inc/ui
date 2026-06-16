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
