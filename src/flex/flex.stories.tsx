import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled, { css } from 'styled-components';
import { Flex } from './flex';
// import { defaultTheme } from '../theming/theming';
// import { ThemeProvider } from 'styled-components';

export default {
  component: Flex,
  title: 'Layout/Flex',
} as ComponentMeta<typeof Flex>;

// flex basis

const FlexBasisCss = css`
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
    Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
`;
const FlexBasisItemCss = css`
  display: flex;
  background-color: rgb(217 70 239);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  height: 3.5rem;
  align-items: center;
  margin-left: 1rem;
  justify-content: center;

  &:first-child {
    margin-left: 0;
  }
`;
const FlexBasisTemplate: ComponentStory<typeof Flex> = (args) => (
  <Flex direction="row" css={FlexBasisCss}>
    <Flex basis="25%" css={FlexBasisItemCss}>
      01
    </Flex>
    <Flex basis="25%" css={FlexBasisItemCss}>
      02
    </Flex>
    <Flex basis="50%" css={FlexBasisItemCss}>
      03
    </Flex>
  </Flex>
);

export const FlexBasis = FlexBasisTemplate.bind({});
FlexBasis.storyName = 'Flex Basis';
FlexBasis.args = {};
FlexBasis.argTypes = {};

// flex direction: row

const FlexDirectionRowCss = css`
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
    Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
`;
const FlexDirectionRowItemCss = css`
  display: flex;
  background-color: rgb(217 70 239);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  width: 3.5rem;
  height: 3.5rem;
  align-items: center;
  margin-left: 1rem;
  justify-content: center;

  &:first-child {
    margin-left: 0;
  }
`;
const FlexDirectionRowTemplate: ComponentStory<typeof Flex> = (args) => (
  <Flex direction="row" css={FlexDirectionRowCss}>
    <Flex css={FlexDirectionRowItemCss}>01</Flex>
    <Flex css={FlexDirectionRowItemCss}>02</Flex>
    <Flex css={FlexDirectionRowItemCss}>03</Flex>
  </Flex>
);

export const FlexDirectionRow = FlexDirectionRowTemplate.bind({});
FlexDirectionRow.storyName = 'Flex Direction: Row';
FlexDirectionRow.args = {};
FlexDirectionRow.argTypes = {};

// flex direction: row reverse

const FlexDirectionRowReverseCss = css`
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
    Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
`;
const FlexDirectionRowReverseItemCss = css`
  display: flex;
  background-color: rgb(59 130 246);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  width: 3.5rem;
  height: 3.5rem;
  align-items: center;
  margin-right: 1rem;
  justify-content: center;

  &:first-child {
    margin-right: 0;
  }
`;
const FlexDirectionRowReverseTemplate: ComponentStory<typeof Flex> = (args) => (
  <Flex direction="row-reverse" css={FlexDirectionRowReverseCss}>
    <Flex css={FlexDirectionRowReverseItemCss}>01</Flex>
    <Flex css={FlexDirectionRowReverseItemCss}>02</Flex>
    <Flex css={FlexDirectionRowReverseItemCss}>03</Flex>
  </Flex>
);

export const FlexDirectionRowReverse = FlexDirectionRowReverseTemplate.bind({});
FlexDirectionRowReverse.storyName = 'Flex Direction: Row Reverse';
FlexDirectionRowReverse.args = {};
FlexDirectionRowReverse.argTypes = {};

// flex direction: column

const FlexDirectionColCss = css`
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
    Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 20rem;
`;
const FlexDirectionColItemCss = css`
  display: flex;
  background-color: rgb(99 102 241);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  height: 3.5rem;
  align-items: center;
  margin-top: 1rem;
  justify-content: center;

  &:first-child {
    margin-top: 0;
  }
`;
const FlexDirectionColTemplate: ComponentStory<typeof Flex> = (args) => (
  <Flex direction="column" mx="auto" css={FlexDirectionColCss}>
    <Flex css={FlexDirectionColItemCss}>01</Flex>
    <Flex css={FlexDirectionColItemCss}>02</Flex>
    <Flex css={FlexDirectionColItemCss}>03</Flex>
  </Flex>
);

export const FlexDirectionCol = FlexDirectionColTemplate.bind({});
FlexDirectionCol.storyName = 'Flex Direction: Column';
FlexDirectionCol.args = {};
FlexDirectionCol.argTypes = {};

// flex direction: column reverse

const FlexDirectionColReverseCss = css`
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
    Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 20rem;
`;
const FlexDirectionColReverseItemCss = css`
  display: flex;
  background-color: rgb(168 85 247);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  height: 3.5rem;
  align-items: center;
  margin-bottom: 1rem;
  justify-content: center;

  &:first-child {
    margin-bottom: 0;
  }
`;
const FlexDirectionColReverseTemplate: ComponentStory<typeof Flex> = (args) => (
  <Flex direction="column-reverse" mx="auto" css={FlexDirectionColReverseCss}>
    <Flex css={FlexDirectionColReverseItemCss}>01</Flex>
    <Flex css={FlexDirectionColReverseItemCss}>02</Flex>
    <Flex css={FlexDirectionColReverseItemCss}>03</Flex>
  </Flex>
);

export const FlexDirectionColReverse = FlexDirectionColReverseTemplate.bind({});
FlexDirectionColReverse.storyName = 'Flex Direction: Column Reverse';
FlexDirectionColReverse.args = {};
FlexDirectionColReverse.argTypes = {};

// flex wrap: nowrap

const FlexNowrapCss = css`
  background-color: #38bdf81a;
  background-image: linear-gradient(
    135deg,
    #0ea5e980 10%,
    transparent 0,
    transparent 50%,
    #0ea5e980 0,
    #0ea5e980 60%,
    transparent 0,
    transparent
  );
  background-size: 7.07px 7.07px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
    Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  width: 40rem;
  overflow: auto;
`;
const FlexNowrapItemCss = css`
  background-color: rgb(14 165 233);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  width: 40%;
`;
const FlexNowrapItemInnerCss = styled.div`
  display: flex;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
`;

const FlexNowrapTemplate: ComponentStory<typeof Flex> = (args) => (
  <Flex wrap="nowrap" gap="1rem" css={FlexNowrapCss}>
    <Flex flex="none" css={FlexNowrapItemCss}>
      <FlexNowrapItemInnerCss>01</FlexNowrapItemInnerCss>
    </Flex>
    <Flex flex="none" css={FlexNowrapItemCss}>
      <FlexNowrapItemInnerCss>02</FlexNowrapItemInnerCss>
    </Flex>
    <Flex flex="none" css={FlexNowrapItemCss}>
      <FlexNowrapItemInnerCss>03</FlexNowrapItemInnerCss>
    </Flex>
  </Flex>
);

export const FlexNowrap = FlexNowrapTemplate.bind({});
FlexNowrap.storyName = 'Flex Wrap: Nowrap';
FlexNowrap.args = {};
FlexNowrap.argTypes = {};

// flex wrap: wrap

const FlexWrapCss = css`
  background-color: #38bdf81a;
  background-image: linear-gradient(
    135deg,
    #0ea5e980 10%,
    transparent 0,
    transparent 50%,
    #0ea5e980 0,
    #0ea5e980 60%,
    transparent 0,
    transparent
  );
  background-size: 7.07px 7.07px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
    Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  width: 40rem;
  overflow: auto;
`;
const FlexWrapItemCss = css`
  background-color: rgb(14 165 233);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  width: 40%;
`;
const FlexWrapItemInnerCss = styled.div`
  display: flex;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
`;

const FlexWrapTemplate: ComponentStory<typeof Flex> = (args) => (
  <Flex wrap="wrap" gap="1rem" css={FlexWrapCss}>
    <Flex flex="none" css={FlexWrapItemCss}>
      <FlexWrapItemInnerCss>01</FlexWrapItemInnerCss>
    </Flex>
    <Flex flex="none" css={FlexWrapItemCss}>
      <FlexWrapItemInnerCss>02</FlexWrapItemInnerCss>
    </Flex>
    <Flex flex="none" css={FlexWrapItemCss}>
      <FlexWrapItemInnerCss>03</FlexWrapItemInnerCss>
    </Flex>
  </Flex>
);

export const FlexWrap = FlexWrapTemplate.bind({});
FlexWrap.storyName = 'Flex Wrap: Wrap';
FlexWrap.args = {};
FlexWrap.argTypes = {};

// flex wrap: wrap reverse

const FlexWrapReverseCss = css`
  background-color: #e879f91a;
  background-image: linear-gradient(
    135deg,
    #d946ef80 10%,
    transparent 0,
    transparent 50%,
    #d946ef80 0,
    #d946ef80 60%,
    transparent 0,
    transparent
  );
  background-size: 7.07px 7.07px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
    Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  width: 40rem;
  overflow: auto;
`;
const FlexWrapReverseItemCss = css`
  background-color: rgb(217 70 239);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  width: 40%;
`;
const FlexWrapReverseItemInnerCss = styled.div`
  display: flex;
  height: 3.5rem;
  align-items: center;
  justify-content: center;
`;

const FlexWrapReverseTemplate: ComponentStory<typeof Flex> = (args) => (
  <Flex wrap="wrap-reverse" gap="1rem" css={FlexWrapReverseCss}>
    <Flex flex="none" css={FlexWrapReverseItemCss}>
      <FlexWrapReverseItemInnerCss>01</FlexWrapReverseItemInnerCss>
    </Flex>
    <Flex flex="none" css={FlexWrapReverseItemCss}>
      <FlexWrapReverseItemInnerCss>02</FlexWrapReverseItemInnerCss>
    </Flex>
    <Flex flex="none" css={FlexWrapReverseItemCss}>
      <FlexWrapReverseItemInnerCss>03</FlexWrapReverseItemInnerCss>
    </Flex>
  </Flex>
);

export const FlexWrapReverse = FlexWrapReverseTemplate.bind({});
FlexWrapReverse.storyName = 'Flex Wrap: Wrap Reverse';
FlexWrapReverse.args = {};
FlexWrapReverse.argTypes = {};
