import { StoryFn, Meta } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { Button } from './button';
import { defaultTheme } from '../theming/theming';

export default {
  component: Button,
  title: 'Form/Button',
} as Meta<typeof Button>;

const BasicTemplate: StoryFn<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

export const Basic = BasicTemplate.bind({});
Basic.args = {
  shape: 'default',
  variant: 'solid',
  disabled: false,
  state: 'idle',
  size: 'md',
};
Basic.argTypes = {
  shape: { control: 'select', options: ['default', 'round', 'square'] },
  variant: {
    control: 'select',
    options: ['solid', 'outline', 'ghost', 'link'],
  },
  state: {
    control: 'select',
    options: ['idle', 'pending', 'success', 'error'],
  },
  size: { control: 'select', options: ['sm', 'md', 'lg'] },
};

const LeftIconTemplate: StoryFn<typeof Button> = (args) => (
  <Button {...args}>
    <Button.Text>Button</Button.Text>
  </Button>
);

export const LeftIcon = LeftIconTemplate.bind({});
LeftIcon.storyName = 'Left Icon';
LeftIcon.args = Basic.args;
LeftIcon.argTypes = Basic.argTypes;

// Custom Theme Example

const newTheme = Object.assign(defaultTheme, {
  ...defaultTheme,
  components: {
    button: {
      primary: {
        color: 'teal',
        backgroundColor: 'purple',
      },
    },
  },
});
const CustomThemeTemplate: StoryFn<typeof Button> = (args) => (
  <ThemeProvider theme={defaultTheme}>
    <Button {...args} theme={newTheme}>
      <Button.Text>Button</Button.Text>
    </Button>
  </ThemeProvider>
);

export const CustomTheme = CustomThemeTemplate.bind({});
CustomTheme.storyName = 'Custom Theme';
CustomTheme.args = Basic.args;
CustomTheme.argTypes = Basic.argTypes;

// // Custom CSS Example

const CustomCssTemplate: StoryFn<typeof Button> = (args) => (
  <Button {...args} css={defaultTheme.components.button.css}>
    <Button.Text>Button</Button.Text>
  </Button>
);

export const CustomCss = CustomCssTemplate.bind({});
CustomCss.storyName = 'Custom CSS';
CustomCss.args = Basic.args;
CustomCss.argTypes = Basic.argTypes;
