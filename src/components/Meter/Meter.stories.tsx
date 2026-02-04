import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Meter } from './Meter';
import { Button } from '../Button/Button';
import { MeterProps } from './Meter.types';

type Story = StoryObj<typeof Meter>;

function Component({ children, value: v, ...props }: MeterProps) {
  const [value, setValue] = useState(v || 0);

  const increase = () =>
    setValue(value === props?.maxValue ? props?.maxValue : value + 10);

  const decrease = () =>
    setValue(value === props?.minValue ? props?.minValue : value - 10);

  useEffect(() => {
    // Sync storybook control value changes to local state
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (v) setValue(v);
  }, [v]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        margin: '2rem 0',
      }}
    >
      {}
      <Meter value={value} {...props} />

      <div
        style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
        }}
      >
        <Button size="sm" onPress={decrease}>
          -
        </Button>
        <Button size="sm" onPress={increase}>
          +
        </Button>
      </div>
    </div>
  );
}

const meta: Meta<typeof Meter> = {
  component: Component,
};

export default meta;

export const Base: Story = {
  argTypes: {
    label: {
      control: 'text',
      description: 'The content to display as label',
    },
    showValue: {
      control: 'boolean',
      description: 'Whether the value show',
    },
    formatOptions: {
      control: 'object',
      description: 'The display format of the value label.',
    },
    valueLabel: {
      control: 'text',
      description:
        'The content to display as the value&apos;s label (e.g. 1 of 4)',
    },
    value: {
      control: 'number',
      description: 'The current value (controlled).',
    },
    minValue: {
      control: 'number',
      description: 'The smallest value allowed for the input.',
    },
    maxValue: {
      control: 'number',
      description: 'The largest value allowed for the input.',
    },
    style: {
      control: 'object',
      description:
        'The inline style for the element. A function may be provided to compute the style based on component state.',
    },
    className: {
      control: 'text',
      description:
        'The CSS className for the element. A function may be provided to compute the class based on component state.',
    },
  },
  args: {
    label: '',
    showValue: true,
    formatOptions: { style: 'percent' },
    valueLabel: '',
    value: 0,
    minValue: 0,
    maxValue: 100,
    style: {},
    className: '',
  },
};
