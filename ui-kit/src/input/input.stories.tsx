import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './input';
import { ReactComponent as Help } from './help.svg';
import styled from 'styled-components';

export default {
  component: Input,
  title: 'Form/Input',
} as ComponentMeta<typeof Input>;

const InputWrapper = styled.div`
  font-family: Inter var, ui-sans-serif, system-ui, -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  font-size: 1rem;
  line-height: 1.5;

  * {
    box-sizing: border-box;
  }
`;

const SimpleInputTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input id="story-input-1" placeholder="Input without label" />
  </InputWrapper>
);

export const SimpleInput = SimpleInputTemplate.bind({});
SimpleInput.storyName = 'Simple Input';
SimpleInput.args = {};
SimpleInput.argTypes = {};

const InputWithLabelTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input
      id="story-input-2"
      label="Input with label"
      placeholder="Input with label"
    />
  </InputWrapper>
);

export const InputWithLabel = InputWithLabelTemplate.bind({});
InputWithLabel.storyName = 'Input with label';
InputWithLabel.args = {};
InputWithLabel.argTypes = {};

const InputAutoWidthTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input
      id="story-input-3"
      label="Input (auto width)"
      placeholder="Input (auto width)"
      inputWidth="auto"
    />
  </InputWrapper>
);

export const InputAutoWidth = InputAutoWidthTemplate.bind({});
InputAutoWidth.storyName = 'Input (auto width)';
InputAutoWidth.args = {};
InputAutoWidth.argTypes = {};

const InputFullWidthTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input
      id="story-input-4"
      label="Input (full width)"
      placeholder="Input (full width)"
      inputWidth="full"
    />
  </InputWrapper>
);

export const InputFullWidth = InputFullWidthTemplate.bind({});
InputFullWidth.storyName = 'Input (full width)';
InputFullWidth.args = {};
InputFullWidth.argTypes = {};

const InputHelperTextTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input
      id="story-input-5"
      inputWidth="full"
      label="Input with helper text"
      placeholder="Input with helper text"
      helperText="This is helper text"
    />
  </InputWrapper>
);

export const InputHelperText = InputHelperTextTemplate.bind({});
InputHelperText.storyName = 'Input with helper text';
InputHelperText.args = {};
InputHelperText.argTypes = {};

const InputErrorStateTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input
      id="story-input-6"
      inputWidth="full"
      label="Input with validation error"
      state="error"
      errorText="This field is required"
    />
  </InputWrapper>
);

export const InputErrorState = InputErrorStateTemplate.bind({});
InputErrorState.storyName = 'Input with validation error';
InputErrorState.args = {};
InputErrorState.argTypes = {};

const InputCornerHintTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input
      id="story-input-7"
      inputWidth="full"
      label="Input with corner hint"
      cornerHint="Optional"
    />
  </InputWrapper>
);

export const InputCornerHint = InputCornerHintTemplate.bind({});
InputCornerHint.storyName = 'Input with corner hint';
InputCornerHint.args = {};
InputCornerHint.argTypes = {};

const InputLeadingIconTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input
      id="story-input-8"
      inputWidth="full"
      label="Input with leading icon"
      leadingAddOn={<Help />}
      pl="2rem"
    />
  </InputWrapper>
);

export const InputLeadingIcon = InputLeadingIconTemplate.bind({});
InputLeadingIcon.storyName = 'Input with leading icon';
InputLeadingIcon.args = {};
InputLeadingIcon.argTypes = {};

const InputTrailingIconTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input
      id="story-input-9"
      inputWidth="full"
      label="Input with trailing icon"
      trailingAddOn={<Help />}
      pr="2rem"
    />
  </InputWrapper>
);

export const InputTrailingIcon = InputTrailingIconTemplate.bind({});
InputTrailingIcon.storyName = 'Input with trailing icon';
InputTrailingIcon.args = {};
InputTrailingIcon.argTypes = {};

const InputLeadingTextTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input
      id="story-input-10"
      inputWidth="full"
      label="Input with leading text"
      leadingAddOn="$"
      pl="2rem"
    />
  </InputWrapper>
);

export const InputLeadingText = InputLeadingTextTemplate.bind({});
InputLeadingText.storyName = 'Input with leading text';
InputLeadingText.args = {};
InputLeadingText.argTypes = {};

const InputTrailingTextTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input
      id="story-input-11"
      inputWidth="full"
      label="Input with trailing text"
      trailingAddOn="$"
      pr="2rem"
    />
  </InputWrapper>
);

export const InputTrailingText = InputTrailingTextTemplate.bind({});
InputTrailingText.storyName = 'Input with trailing text';
InputTrailingText.args = {};
InputTrailingText.argTypes = {};

const InputInsideLabelTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input
      id="story-input-12"
      inputWidth="full"
      label="Input with inside label"
      labelPosition="inside"
    />
  </InputWrapper>
);

export const InputInsideLabel = InputInsideLabelTemplate.bind({});
InputInsideLabel.storyName = 'Input with inside label';
InputInsideLabel.args = {};
InputInsideLabel.argTypes = {};

const InputOverlapLabelTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input
      id="story-input-12"
      inputWidth="full"
      label="Input with overlap label"
      labelPosition="overlap"
    />
  </InputWrapper>
);

export const InputOverlapLabel = InputOverlapLabelTemplate.bind({});
InputOverlapLabel.storyName = 'Input with overlap label';
InputOverlapLabel.args = {};
InputOverlapLabel.argTypes = {};

const InputKeyboardShortcutTemplate: ComponentStory<typeof Input> = (args) => (
  <InputWrapper>
    <Input
      id="story-input-13"
      inputWidth="full"
      label="Input with keyboard shortcut"
      keyboardShortcut="⌘K"
    />
  </InputWrapper>
);

export const InputKeyboardShortcut = InputKeyboardShortcutTemplate.bind({});
InputKeyboardShortcut.storyName = 'Input with keyboard shortcut';
InputKeyboardShortcut.args = {};
InputKeyboardShortcut.argTypes = {};
