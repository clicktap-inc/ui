import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled, { css } from 'styled-components';
import { Grid, GridItem } from './grid';
// import { defaultTheme } from '../theming/theming';
// import { ThemeProvider } from 'styled-components';

export default {
  component: Grid,
  title: 'Layout/Grid',
} as ComponentMeta<typeof Grid>;

const GridItemCss = css`
  background-color: rgb(217 70 239);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  padding: 1rem;
`;
const TemplateColsTemplate: ComponentStory<typeof Grid> = (args) => (
  <Grid
    {...args}
    cols={4}
    gap="1rem"
    css={css`
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
    `}
  >
    <GridItem css={GridItemCss}>01</GridItem>
    <GridItem css={GridItemCss}>02</GridItem>
    <GridItem css={GridItemCss}>03</GridItem>
    <GridItem css={GridItemCss}>04</GridItem>
    <GridItem css={GridItemCss}>05</GridItem>
    <GridItem css={GridItemCss}>06</GridItem>
    <GridItem css={GridItemCss}>07</GridItem>
    <GridItem css={GridItemCss}>08</GridItem>
    <GridItem css={GridItemCss}>09</GridItem>
  </Grid>
);

export const TemplateCols = TemplateColsTemplate.bind({});
TemplateCols.storyName = 'Grid Template Columns';
TemplateCols.args = {};
TemplateCols.argTypes = {};

// template col span
const GridItemColSpanCss = css`
  background-color: rgb(165 180 252);
  border-radius: 0.5rem;
  padding: 1rem;
`;
const GridItemColSpanDarkCss = css`
  background-color: rgb(99 102 241);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  padding: 1rem;
`;
const TemplateColSpanTemplate: ComponentStory<typeof Grid> = (args) => (
  <Grid
    {...args}
    cols={3}
    gap="1rem"
    css={css`
      background-size: 7.07px 7.07px;
      color: #fff;
      font-weight: bold;
      text-align: center;
      font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
        Consolas, 'Liberation Mono', 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    `}
  >
    <GridItem css={GridItemColSpanCss}>01</GridItem>
    <GridItem css={GridItemColSpanCss}>02</GridItem>
    <GridItem css={GridItemColSpanCss}>03</GridItem>
    <GridItem colSpan={2} css={GridItemColSpanDarkCss}>
      04
    </GridItem>
    <GridItem css={GridItemColSpanCss}>05</GridItem>
    <GridItem css={GridItemColSpanCss}>06</GridItem>
    <GridItem colSpan={2} css={GridItemColSpanDarkCss}>
      07
    </GridItem>
  </Grid>
);

export const TemplateColSpan = TemplateColSpanTemplate.bind({});
TemplateColSpan.storyName = 'Grid Column Span';
TemplateColSpan.args = {};
TemplateColSpan.argTypes = {};

// template col start/end
const GridItemColStartEndCss = css`
  background-color: rgb(14 165 233);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  padding: 1rem;
`;
const GridItemColStartEndSpacerCss = css`
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
  border-radius: 0.5rem;
`;
const TemplateColStartEndTemplate: ComponentStory<typeof Grid> = (args) => (
  <Grid
    {...args}
    cols={6}
    gap="1rem"
    css={css`
      background-size: 7.07px 7.07px;
      color: #fff;
      font-weight: bold;
      text-align: center;
      font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
        Consolas, 'Liberation Mono', 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    `}
  >
    <GridItem css={GridItemColStartEndSpacerCss} />
    <GridItem colStart={2} colSpan={4} css={GridItemColStartEndCss}>
      01
    </GridItem>
    <GridItem css={GridItemColStartEndSpacerCss} />
    <GridItem colStart={1} colEnd={3} css={GridItemColStartEndCss}>
      02
    </GridItem>
    <GridItem css={GridItemColStartEndSpacerCss} />
    <GridItem css={GridItemColStartEndSpacerCss} />
    <GridItem colEnd={7} colSpan={2} css={GridItemColStartEndCss}>
      03
    </GridItem>
    <GridItem colStart={1} colEnd={7} css={GridItemColStartEndCss}>
      04
    </GridItem>
  </Grid>
);

export const TemplateColStartEnd = TemplateColStartEndTemplate.bind({});
TemplateColStartEnd.storyName = 'Grid Column Start/End';
TemplateColStartEnd.args = {};
TemplateColStartEnd.argTypes = {};

// template rows
const GridItemRowCss = css`
  background-color: rgb(236 72 153);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  padding: 1rem;
`;
const TemplateRowsTemplate: ComponentStory<typeof Grid> = (args) => (
  <Grid
    {...args}
    rows={4}
    gap="1rem"
    autoFlow="column"
    css={css`
      background-color: #f472b61a;
      background-image: linear-gradient(
        135deg,
        #ec489980 10%,
        transparent 0,
        transparent 50%,
        #ec489980 0,
        #ec489980 60%,
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
    `}
  >
    <GridItem css={GridItemRowCss}>01</GridItem>
    <GridItem css={GridItemRowCss}>02</GridItem>
    <GridItem css={GridItemRowCss}>03</GridItem>
    <GridItem css={GridItemRowCss}>04</GridItem>
    <GridItem css={GridItemRowCss}>05</GridItem>
    <GridItem css={GridItemRowCss}>06</GridItem>
    <GridItem css={GridItemRowCss}>07</GridItem>
    <GridItem css={GridItemRowCss}>08</GridItem>
    <GridItem css={GridItemRowCss}>09</GridItem>
  </Grid>
);

export const TemplateRows = TemplateRowsTemplate.bind({});
TemplateRows.storyName = 'Grid Template Rows';
TemplateRows.args = TemplateCols.args;
TemplateRows.argTypes = TemplateCols.argTypes;

// template col span
const GridItemRowSpanCss = css`
  display: grid;
  background-color: rgb(240 171 252);
  border-radius: 0.5rem;
  padding: 1rem;
  place-content: center;
`;
const GridItemRowSpanDarkCss = css`
  display: grid;
  background-color: rgb(217 70 239);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  padding: 1rem;
  place-content: center;
`;
const TemplateRowSpanTemplate: ComponentStory<typeof Grid> = (args) => (
  <Grid
    {...args}
    rows={3}
    autoFlow="column"
    gap="1rem"
    css={css`
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
    `}
  >
    <GridItem rowSpan={3} css={GridItemRowSpanDarkCss}>
      01
    </GridItem>
    <GridItem colSpan={2} css={GridItemRowSpanCss}>
      02
    </GridItem>
    <GridItem rowSpan={2} colSpan={2} css={GridItemRowSpanDarkCss}>
      03
    </GridItem>
  </Grid>
);

export const TemplateRowSpan = TemplateRowSpanTemplate.bind({});
TemplateRowSpan.storyName = 'Grid Row Span';
TemplateRowSpan.args = {};
TemplateRowSpan.argTypes = {};

// template col start/end
const GridItemRowStartEndCss = css`
  display: grid;
  background-color: rgb(59 130 246);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  padding: 3rem;
  place-content: center;
`;
const TemplateRowStartEndTemplate: ComponentStory<typeof Grid> = (args) => (
  <Grid
    {...args}
    rows={3}
    autoFlow="column"
    gap="1rem"
    css={css`
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
    `}
  >
    <GridItem rowStart={2} rowSpan={2} css={GridItemRowStartEndCss}>
      01
    </GridItem>
    <GridItem rowEnd={3} rowSpan={2} css={GridItemRowStartEndCss}>
      02
    </GridItem>
    <GridItem rowStart={1} rowEnd={4} css={GridItemRowStartEndCss}>
      03
    </GridItem>
  </Grid>
);

export const TemplateRowStartEnd = TemplateRowStartEndTemplate.bind({});
TemplateRowStartEnd.storyName = 'Grid Row Start/End';
TemplateRowStartEnd.args = {};
TemplateRowStartEnd.argTypes = {};

// autoflow
const GridItemAutoflowCss = css`
  display: grid;
  background-color: rgb(216 180 254);
  border-radius: 0.5rem;
  padding: 1rem;
  place-content: center;
`;
const GridItemAutoflowDarkCss = css`
  display: grid;
  background-color: rgb(168 85 247);
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  padding: 1rem;
  place-content: center;
`;
const TemplateAutoflowTemplate: ComponentStory<typeof Grid> = (args) => (
  <Grid
    {...args}
    cols={3}
    rows={3}
    autoFlow="row dense"
    gap="1rem"
    css={css`
      background-color: #c084fc1a;
      background-image: linear-gradient(
        135deg,
        #a855f780 10%,
        transparent 0,
        transparent 50%,
        #a855f780 0,
        #a855f780 60%,
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
    `}
  >
    <GridItem colSpan={2} css={GridItemAutoflowCss}>
      01
    </GridItem>
    <GridItem colSpan={2} css={GridItemAutoflowCss}>
      02
    </GridItem>
    <GridItem css={GridItemAutoflowDarkCss}>03</GridItem>
    <GridItem css={GridItemAutoflowCss}>04</GridItem>
    <GridItem css={GridItemAutoflowCss}>05</GridItem>
  </Grid>
);

export const TemplateAutoflow = TemplateAutoflowTemplate.bind({});
TemplateAutoflow.storyName = 'Grid Auto Flow';
TemplateAutoflow.args = {};
TemplateAutoflow.argTypes = {};

// justify items - start
const GridItemJustifyItemsStartCss = css`
  display: grid;
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
  border-radius: 0.5rem;
`;
const GridItemJustifyItemsStartInner = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(14 165 233);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  border-radius: 0.5rem;
`;
const TemplateJustifyItemsStartTemplate: ComponentStory<typeof Grid> = (
  args
) => (
  <Grid
    {...args}
    cols={3}
    gap="1rem"
    css={css`
      color: #fff;
      font-weight: bold;
      text-align: center;
      font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
        Consolas, 'Liberation Mono', 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    `}
  >
    <Grid justifyItems="start" css={GridItemJustifyItemsStartCss}>
      <GridItemJustifyItemsStartInner>01</GridItemJustifyItemsStartInner>
    </Grid>
    <Grid justifyItems="start" css={GridItemJustifyItemsStartCss}>
      <GridItemJustifyItemsStartInner>02</GridItemJustifyItemsStartInner>
    </Grid>
    <Grid justifyItems="start" css={GridItemJustifyItemsStartCss}>
      <GridItemJustifyItemsStartInner>03</GridItemJustifyItemsStartInner>
    </Grid>
    <Grid justifyItems="start" css={GridItemJustifyItemsStartCss}>
      <GridItemJustifyItemsStartInner>04</GridItemJustifyItemsStartInner>
    </Grid>
    <Grid justifyItems="start" css={GridItemJustifyItemsStartCss}>
      <GridItemJustifyItemsStartInner>05</GridItemJustifyItemsStartInner>
    </Grid>
    <Grid justifyItems="start" css={GridItemJustifyItemsStartCss}>
      <GridItemJustifyItemsStartInner>06</GridItemJustifyItemsStartInner>
    </Grid>
  </Grid>
);

export const TemplateJustifyItemsStart = TemplateJustifyItemsStartTemplate.bind(
  {}
);
TemplateJustifyItemsStart.storyName = 'Justify Items: Start';
TemplateJustifyItemsStart.args = {};
TemplateJustifyItemsStart.argTypes = {};

// justify items - end
const GridItemJustifyItemsEndCss = css`
  display: grid;
  background-color: #22d3ee1a;
  background-image: linear-gradient(
    135deg,
    #06b6d480 10%,
    transparent 0,
    transparent 50%,
    #06b6d480 0,
    #06b6d480 60%,
    transparent 0,
    transparent
  );
  background-size: 7.07px 7.07px;
  border-radius: 0.5rem;
`;
const GridItemJustifyItemsEndInner = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(6 182 212);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  border-radius: 0.5rem;
`;
const TemplateJustifyItemsEndTemplate: ComponentStory<typeof Grid> = (args) => (
  <Grid
    {...args}
    cols={3}
    gap="1rem"
    css={css`
      color: #fff;
      font-weight: bold;
      text-align: center;
      font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
        Consolas, 'Liberation Mono', 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    `}
  >
    <Grid justifyItems="end" css={GridItemJustifyItemsEndCss}>
      <GridItemJustifyItemsEndInner>01</GridItemJustifyItemsEndInner>
    </Grid>
    <Grid justifyItems="end" css={GridItemJustifyItemsEndCss}>
      <GridItemJustifyItemsEndInner>02</GridItemJustifyItemsEndInner>
    </Grid>
    <Grid justifyItems="end" css={GridItemJustifyItemsEndCss}>
      <GridItemJustifyItemsEndInner>03</GridItemJustifyItemsEndInner>
    </Grid>
    <Grid justifyItems="end" css={GridItemJustifyItemsEndCss}>
      <GridItemJustifyItemsEndInner>04</GridItemJustifyItemsEndInner>
    </Grid>
    <Grid justifyItems="end" css={GridItemJustifyItemsEndCss}>
      <GridItemJustifyItemsEndInner>05</GridItemJustifyItemsEndInner>
    </Grid>
    <Grid justifyItems="end" css={GridItemJustifyItemsEndCss}>
      <GridItemJustifyItemsEndInner>06</GridItemJustifyItemsEndInner>
    </Grid>
  </Grid>
);

export const TemplateJustifyItemsEnd = TemplateJustifyItemsEndTemplate.bind({});
TemplateJustifyItemsEnd.storyName = 'Justify Items: End';
TemplateJustifyItemsEnd.args = {};
TemplateJustifyItemsEnd.argTypes = {};

// justify items - center
const GridItemJustifyItemsCenterCss = css`
  display: grid;
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
  border-radius: 0.5rem;
`;
const GridItemJustifyItemsCenterInner = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(217 70 239);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  border-radius: 0.5rem;
`;
const TemplateJustifyItemsCenterTemplate: ComponentStory<typeof Grid> = (
  args
) => (
  <Grid
    {...args}
    cols={3}
    gap="1rem"
    css={css`
      color: #fff;
      font-weight: bold;
      text-align: center;
      font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
        Consolas, 'Liberation Mono', 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    `}
  >
    <Grid justifyItems="center" css={GridItemJustifyItemsCenterCss}>
      <GridItemJustifyItemsCenterInner>01</GridItemJustifyItemsCenterInner>
    </Grid>
    <Grid justifyItems="center" css={GridItemJustifyItemsCenterCss}>
      <GridItemJustifyItemsCenterInner>02</GridItemJustifyItemsCenterInner>
    </Grid>
    <Grid justifyItems="center" css={GridItemJustifyItemsCenterCss}>
      <GridItemJustifyItemsCenterInner>03</GridItemJustifyItemsCenterInner>
    </Grid>
    <Grid justifyItems="center" css={GridItemJustifyItemsCenterCss}>
      <GridItemJustifyItemsCenterInner>04</GridItemJustifyItemsCenterInner>
    </Grid>
    <Grid justifyItems="center" css={GridItemJustifyItemsCenterCss}>
      <GridItemJustifyItemsCenterInner>05</GridItemJustifyItemsCenterInner>
    </Grid>
    <Grid justifyItems="center" css={GridItemJustifyItemsCenterCss}>
      <GridItemJustifyItemsCenterInner>06</GridItemJustifyItemsCenterInner>
    </Grid>
  </Grid>
);

export const TemplateJustifyItemsCenter =
  TemplateJustifyItemsCenterTemplate.bind({});
TemplateJustifyItemsCenter.storyName = 'Justify Items: Center';
TemplateJustifyItemsCenter.args = {};
TemplateJustifyItemsCenter.argTypes = {};

// justify items - stretch
const GridItemJustifyItemsStretchCss = css`
  display: grid;
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
  border-radius: 0.5rem;
`;
const GridItemJustifyItemsStretchInner = styled.div`
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(59 130 246);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  border-radius: 0.5rem;
`;
const TemplateJustifyItemsStretchTemplate: ComponentStory<typeof Grid> = (
  args
) => (
  <Grid
    {...args}
    cols={3}
    gap="1rem"
    justifyItems="stretch"
    css={css`
      color: #fff;
      font-weight: bold;
      text-align: center;
      font-family: 'Fira Code VF', ui-monospace, SFMono-Regular, Menlo, Monaco,
        Consolas, 'Liberation Mono', 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    `}
  >
    <GridItemJustifyItemsStretchInner>01</GridItemJustifyItemsStretchInner>
    <GridItemJustifyItemsStretchInner>02</GridItemJustifyItemsStretchInner>
    <GridItemJustifyItemsStretchInner>03</GridItemJustifyItemsStretchInner>
    <GridItemJustifyItemsStretchInner>04</GridItemJustifyItemsStretchInner>
    <GridItemJustifyItemsStretchInner>05</GridItemJustifyItemsStretchInner>
    <GridItemJustifyItemsStretchInner>06</GridItemJustifyItemsStretchInner>
  </Grid>
);

export const TemplateJustifyItemsStretch =
  TemplateJustifyItemsStretchTemplate.bind({});
TemplateJustifyItemsStretch.storyName = 'Justify Items: Stretch';
TemplateJustifyItemsStretch.args = {};
TemplateJustifyItemsStretch.argTypes = {};
