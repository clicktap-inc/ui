import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ButtonLoadingContent } from './ButtonLoadingContent';

const meta: Meta<typeof Button> = { component: Button };
export default meta;
type Story = StoryObj<typeof Button>;

// Interactive playground — flip variant / size / state via the Controls panel.
export const Example: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    isLoading: false,
    isDisabled: false,
  },
  argTypes: {
    variant: {
      options: [
        'solid',
        'outline',
        'ghost',
        'primary',
        'secondary',
        'tertiary',
      ],
      control: 'radio',
    },
    size: { options: ['sm', 'md', 'lg'], control: 'radio' },
    isLoading: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
  },
};

// The three visual styles. `primary` / `secondary` / `tertiary` are semantic
// aliases that resolve to `solid` / `outline` / `ghost` respectively.
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Submitting state — wrap the label in <ButtonLoadingContent> so the spinner
// fades in on the right while the action is in flight (the Place Order / Add to
// Cart pattern). The button is disabled during submit. `spinnerStroke` defaults
// to white for solid buttons; pass a dark color for outline/ghost.
export const Submitting: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary" isDisabled>
        <ButtonLoadingContent isLoading>Placing order</ButtonLoadingContent>
      </Button>
      <Button variant="secondary" isDisabled>
        <ButtonLoadingContent isLoading spinnerStroke="#0f172a">
          Adding to cart
        </ButtonLoadingContent>
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary" isDisabled>
        Primary
      </Button>
      <Button variant="secondary" isDisabled>
        Secondary
      </Button>
      <Button variant="tertiary" isDisabled>
        Tertiary
      </Button>
    </div>
  ),
};
