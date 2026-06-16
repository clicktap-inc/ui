import type { Meta, StoryObj } from '@storybook/react';
import { DobInput } from './DobInput';

const meta: Meta<typeof DobInput> = { component: DobInput };
export default meta;
type Story = StoryObj<typeof DobInput>;

export const Example: Story = {
  args: { label: 'Date of birth' },
};
