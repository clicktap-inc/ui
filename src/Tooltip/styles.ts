import { styled } from 'styled-components';
import { Tooltip } from '@nextui-org/tooltip';
import { defaultTheme } from '../defaultTheme';

export const StyledTooltip = styled(Tooltip).attrs({
  className: 'tooltip',
})`
  z-index: 0;
  position: relative;
  background-color: transparent;

  :before {
    content: '';
    display: none;
    z-index: -1;
    position: absolute;
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 0.125rem;
    background-color: ${({ theme }) =>
      theme?.colors?.slate?.[500] ?? defaultTheme.colors.slate[500]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }

  &[data-arrow='true']:before {
    display: block;
  }

  &[data-placement='top']:before {
    bottom: calc(-1.25rem / 4);
    left: 50%;
    transform: rotate(45deg) translateX(-50%);
  }

  &[data-placement='top-start']:before {
    bottom: calc(calc(1.25rem / 4 - 3px) * -1);
    left: 0.75rem;
    transform: rotate(45deg);
  }

  &[data-placement='top-end']:before {
    bottom: calc(calc(1.25rem / 4 - 3px) * -1);
    right: 0.75rem;
    transform: rotate(45deg);
  }

  &[data-placement='bottom']:before {
    top: calc(1.25rem / 4 - 3px);
    left: 50%;
    transform: rotate(45deg) translateX(-50%);
  }

  &[data-placement='bottom-start']:before {
    top: calc(calc(1.25rem / 4 - 3px) * -1);
    left: 0.75rem;
    transform: rotate(45deg);
  }

  &[data-placement='bottom-end']:before {
    top: calc(calc(1.25rem / 4 - 3px) * -1);
    right: 0.75rem;
    transform: rotate(45deg);
  }

  &[data-placement='left']:before {
    right: 0.125rem;
    top: 50%;
    transform: rotate(45deg) translateY(-50%);
  }

  &[data-placement='left-start']:before {
    right: calc(calc(1.25rem / 4 - 3px) * -1);
    top: 25%;
    transform: rotate(45deg);
  }

  &[data-placement='left-end']:before {
    right: calc(calc(1.25rem / 4 - 3px) * -1);
    bottom: 25%;
    transform: rotate(45deg);
  }

  &[data-placement='right']:before {
    left: calc(calc(1.25rem / 4 + 0.5px) * -1);
    top: 50%;
    transform: rotate(45deg) translateY(-50%);
  }

  &[data-placement='right-start']:before {
    left: calc(calc(1.25rem / 4 - 3px) * -1);
    top: 25%;
    transform: rotate(45deg);
  }

  &[data-placement='right-end']:before {
    left: calc(calc(1.25rem / 4 - 3px) * -1);
    bottom: 25%;
    transform: rotate(45deg);
  }

  outline: none;

  &[data-focus-visible='true'] {
    z-index: 10;
    outline-width: 2px;
    outline-offset: 2px;
    outline-color: ${({ theme }) =>
      theme?.colors?.slate?.[500] ?? defaultTheme.colors.slate[500]};
  }

  &.tooltip-content {
    z-index: 10;
    padding: 0.25rem 0.625rem;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    -webkit-font-smoothing: auto;
    -moz-osx-font-smoothing: auto;
    outline: none;
    box-sizing: border-box;
    font-size: 0.875rem;
    line-height: 1.25rem;
    background-color: ${({ theme }) =>
      theme?.colors?.slate?.[500] ?? defaultTheme.colors.slate[500]};
    color: ${({ theme }) => theme?.colors?.white ?? defaultTheme.colors.white};
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  }
`;

export default { StyledTooltip };
