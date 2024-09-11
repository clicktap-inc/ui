import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import { action } from '@storybook/addon-actions';
import { TimeInput } from './TimeInput';
import { TimeInputProps } from './types';
import { Button } from '../Button/Button';

type Story = StoryObj<typeof TimeInput>;

function Component({ children, ...props }: TimeInputProps) {
  return (
    <Form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '20rem',
      }}
      onSubmit={(e) => {
        e.preventDefault();
        action('onPress');
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <TimeInput {...props}>{children}</TimeInput>
      <Button size="sm" type="submit">
        Submit
      </Button>
    </Form>
  );
}

const meta: Meta<typeof TimeInput> = {
  component: Component,
};

export default meta;

export const Base: Story = {
  argTypes: {
    label: {
      control: 'text',
      description: 'The content to display as label',
    },
    description: {
      control: 'text',
      description: 'The content to display as description',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the input is disabled.',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the input value is invalid.',
    },
    isRequired: {
      control: 'boolean',
      description:
        'Whether user input is required on the input before form submission.',
    },
    isReadOnly: {
      control: 'boolean',
      description:
        'Whether the input can be selected but not changed by the user.',
    },
    hideTimeZone: {
      control: 'boolean',
      description: 'Whether to hide the time zone abbreviation.',
    },
    shouldForceLeadingZeros: {
      control: 'boolean',
      description:
        'Whether to always show leading zeros in the hour field. By default, this is determined by the user&aposs locale.',
    },
    hourCycle: {
      options: [12, 24],
      control: { type: 'inline-radio' },
      description:
        'Whether to display the time in 12 or 24 hour format. By default, this is determined by the user&apos;s locale.',
    },
    granularity: {
      options: ['hour', 'minute', 'second'],
      control: { type: 'inline-radio' },
      description:
        'Determines the smallest unit that is displayed in the time picker',
      table: {
        defaultValue: { summary: 'minute' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'The current error messages for the input if it is invalid.',
    },
    style: {
      control: 'object',
      description:
        'The inline style for the element. A function may be provided to compute the style based on component state',
    },
    className: {
      control: 'text',
      description: 'The CSS className for the element.',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Whether the element should receive focus on render.',
    },
  },
  args: {
    label: '',
    description: '',
    isDisabled: false,
    isInvalid: false,
    isRequired: false,
    isReadOnly: false,
    errorMessage: 'Please fill out this field.',
    shouldForceLeadingZeros: false,
    hideTimeZone: false,
    hourCycle: 24,
    granularity: 'minute',
    autoFocus: false,
    style: {},
    className: '',
  },
};
