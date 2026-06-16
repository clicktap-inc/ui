import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';

const meta: Meta<typeof Breadcrumbs> = { component: Breadcrumbs };
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

// Separators are explicit: interleave <BreadcrumbSeparator /> (the `>` chevron)
// between items, matching the app pattern (`{index > 0 && <BreadcrumbSeparator />}`).
export const Example: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Catalog</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink>Product</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
};
