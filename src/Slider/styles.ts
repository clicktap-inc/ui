import {
  Label,
  Slider,
  SliderOutput,
  SliderTrack,
  SliderThumb,
} from 'react-aria-components';
import styled from 'styled-components';
import { defaultTheme } from '../defaultTheme';

export const StyledSlider = styled(Slider)`
  --label-color: ${({ theme }) =>
    theme?.colors?.slate?.[500] ?? defaultTheme.colors.slate[500]};
  --track-background: ${({ theme }) =>
    theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
  --thumb-background: ${({ theme }) =>
    theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
  --thumb-background-dragging: ${({ theme }) =>
    theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
  --thumb-border-color: ${({ theme }) =>
    theme?.colors?.white ?? defaultTheme.colors.white};
  --thumb-cursor: pointer;

  &[data-disabled] {
    --label-color: ${({ theme }) =>
      theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400]};
    --track-background: ${({ theme }) =>
      theme?.colors?.slate?.[100] ?? defaultTheme.colors.slate[100]};
    --thumb-background: ${({ theme }) =>
      theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};
    --thumb-cursor: default;
  }

  &[data-orientation='horizontal'] {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  &[data-orientation='vertical'] {
    display: block;
    height: 100%;
    width: 2rem;
  }
`;

export const StyledLabel = styled(Label)`
  display: flex;
  flex: 1 1 0;
  font-size: 0.8rem;
  color: var(--label-color);
`;

export const StyledSliderOutput = styled(SliderOutput)`
  display: flex;
  flex: 0 1 0;
  margin-left: auto;
  justify-content: flex-end;
  font-size: 0.8rem;
  color: var(--label-color);
`;

export const StyledSliderThumb = styled(SliderThumb)`
  background-color: var(--thumb-background);
  border: 2px solid var(--thumb-border-color);
  forced-color-adjust: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  cursor: var(--thumb-cursor);
  transition: background-color ease 0.25s;

  &[data-focused] {
    outline: 2px solid
      ${({ theme }) =>
        theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};
  }

  &[data-dragging] {
    background-color: var(--thumb-background-dragging);
  }
`;

export const StyledSliderTrack = styled(SliderTrack)`
  width: 100%;
  transition: all ease 0.25s;

  :before {
    content: '';
    background: var(--track-background);
    display: block;
    position: absolute;
    cursor: var(--thumb-cursor);
  }

  &[data-orientation='horizontal'] {
    width: 100%;
    height: 2rem;

    &:before {
      width: 100%;
      height: 2px;
      top: 50%;
      transform: translateY(-50%);
    }

    ${StyledSliderThumb} {
      top: 50%;
    }
  }

  &[data-orientation='vertical'] {
    width: 2rem;
    height: 100%;

    &:before {
      width: 2px;
      height: 100%;
      left: 50%;
      transform: translate(-50%);
    }

    ${StyledSliderThumb} {
      left: 50%;
    }
  }
`;
