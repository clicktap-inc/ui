import { styled, css } from 'styled-components';
import { Accordion } from '@nextui-org/accordion';
import { defaultTheme } from '../defaultTheme';

export const StyledAccordion = styled(Accordion)`
  width: 100%;
  ${({ theme, variant }) => {
    switch (variant) {
      case 'shadow':
        return css`
          padding-inline: 1rem;
          border-radius: 0.75rem;
          background-color: ${theme?.colors?.slate?.[100] ??
          defaultTheme.colors.slate[200]};
          box-shadow: ${theme?.colors?.slate?.[200] ??
            defaultTheme.colors.slate[200]}
            0px 0px 0px 1px;
        `;
      case 'bordered':
        return css`
          padding-inline: 1rem;
          border-radius: 0.75rem;
          border: 2px solid
            ${theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};
        `;
      case 'splitted':
        return css`
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        `;
      case 'light':
      default:
        return css`
          padding-inline: 0.5rem;
        `;
    }
  }};

  .accordion-base {
    &[data-disabled] {
      pointer-events: none;
      opacity: 0.5;
    }

    ${({ theme, variant }) => {
      switch (variant) {
        case 'splitted':
          return css`
            padding-inline: 1rem;
            border-radius: 0.75rem;
            background-color: ${theme?.colors?.slate?.[100] ??
            defaultTheme.colors.slate[100]};
            box-shadow: ${theme?.colors?.slate?.[200] ??
              defaultTheme.colors.slate[200]}
              0px 0px 0px 1px;
          `;
        default:
          return css``;
      }
    }};
  }

  .accordion-heading {
    margin: 0;
  }

  .accordion-trigger {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: ${({ isCompact }) => (isCompact ? '0.5rem 0' : '1rem 0')};
    appearance: button;
    color: inherit;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;
    outline: 2px solid transparent;
    outline-offset: 2px;
    cursor: pointer;
    border: 0 solid transparent;
    user-select: none;

    .text-large {
      font-size: 1.125rem;
      line-height: 1.75rem;
      font-weight: 600;
    }

    .text-medium {
      font-size: 1rem;
      line-height: 1.5;
    }

    .text-small {
      font-size: 0.875rem;
      line-height: 1.2;
    }

    &:not([data-focus-visible='true']) {
      outline: 0;
    }
  }

  .accordion-start_content {
    flex-shrink: 0;
  }

  .accordion-title_wrapper {
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    text-align: start;
  }

  .accordion-indicator {
    transition: transform 300ms ease;
    &.text-large,
    &.text-medium,
    &.text-small {
      line-height: 0;
    }
    transform: rotate(-90deg);
    &[data-open='true'] {
      transform: rotate(90deg);
    }
    svg {
      width: 1rem;
      height: 1rem;
    }
  }

  .accordion-content {
    padding-block: ${({ isCompact }) => (isCompact ? '0.25rem' : '0.5rem')};
  }

  [role='separator'] {
    border-width: 1px 0 0;
    border-style: solid;
    border-color: ${({ theme, variant }) => {
      switch (variant) {
        case 'shadow':
          return theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300];
        case 'bordered':
        case 'splitted':
        case 'light':
        default:
          return theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200];
      }
    }};
    margin: 0;
  }
`;

export default StyledAccordion;
