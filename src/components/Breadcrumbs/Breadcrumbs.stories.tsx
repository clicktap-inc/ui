import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';

const meta: Meta<typeof Breadcrumbs> = { component: Breadcrumbs };
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Example: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="#">Catalog</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>Product</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumbs>
  ),
};
