import styled, { css } from 'styled-components';
import { Tabs, TabList, Tab, TabPanel, TabsProps } from 'react-aria-components';
import { motion } from 'framer-motion';
import type { TabListProps, TabItem, TabProps } from './types';
import { defaultTheme } from '../defaultTheme';

export const StyledTabs = styled(Tabs)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;

  &[data-orientation='vertical'] {
    flex-direction: row;
  }
`;

export const StyledTabList = styled(TabList<TabItem>)<TabListProps>`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: nowrap;

  &[data-orientation='vertical'] {
    max-width: max-content;
    flex-direction: column;
    justify-content: flex-start;
  }

  ${({ variant, theme }) => {
    switch (variant) {
      case 'solid':
        return css`
          background-color: ${theme?.colors?.slate?.[200] ??
          defaultTheme.colors.slate[200]};
          border-radius: 0.75rem;
          padding: 0.25rem;
        `;
      case 'outline':
        return css`
          border: 2px solid
            ${theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};
          border-radius: 0.75rem;
          padding: 0.25rem;
        `;
      case 'underline':
        return css`
          &[data-orientation='vertical'] {
            &:before {
              display: block;
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              content: '';
              width: 1px;
              background-color: ${theme?.colors?.slate?.[200] ??
              defaultTheme.colors.slate[200]};
            }
          }
          &[data-orientation='horizontal'] {
            &:before {
              display: block;
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              content: '';
              height: 1px;
              background-color: ${theme?.colors?.slate?.[200] ??
              defaultTheme.colors.slate[200]};
            }
          }
        `;
      default:
        return null;
    }
  }}
`;

export const StyledTab = styled(Tab)<
  TabProps & { orientation: TabsProps['orientation'] }
>`
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: ${({ orientation, variant }) => {
    switch (variant) {
      case 'underline':
        return orientation === 'horizontal' ? 'center' : 'flex-start';
      default:
        return 'center';
    }
  }};
  padding: ${({ orientation, variant }) => {
    switch (variant) {
      case 'underline':
        return orientation === 'horizontal'
          ? '0.75rem 0.75rem'
          : '0.75rem 0.75rem 0.75rem 0';
      default:
        return '0.5rem 0.75rem';
    }
  }};
  font-size: 0.875rem;
  line-height: 1.2;
  cursor: pointer;
  forced-color-adjust: none;
  transition: color 0.3s ease;

  color: ${({ variant, theme }) => {
    switch (variant) {
      case 'underline':
      case 'enclosed':
      case 'outline':
        return theme?.colors?.slate?.[800] ?? defaultTheme.colors.slate[800];
      case 'solid':
        return theme?.colors?.slate?.[400] ?? defaultTheme.colors.slate[400];
      default:
        return null;
    }
  }};

  &[data-selected] {
    color: ${({ variant, theme }) => {
      switch (variant) {
        case 'underline':
        case 'outline':
          return theme?.colors?.slate?.[800] ?? defaultTheme.colors.slate[800];
        case 'solid':
        case 'enclosed':
          return theme?.colors?.slate?.[100] ?? defaultTheme.colors.slate[100];
        default:
          return null;
      }
    }};
  }

  &[data-selected],
  &[data-hovered] {
    &:not([data-focus-visible]) {
      outline: none;
    }
  }

  &[data-hovered]:not([data-selected]) {
    color: ${({ theme }) =>
      theme?.colors?.slate?.[500] ?? defaultTheme.colors.slate[500]};
  }

  &[data-disabled] {
    opacity: 0.5;
  }
`;

export const TabOverlay = styled(motion.span).attrs({
  className: 'tab-overlay',
})<TabProps & { orientation: TabsProps['orientation'] }>`
  position: absolute;
  z-index: 1;

  ${({ orientation, theme, variant }) => {
    switch (variant) {
      case 'solid':
        return css`
          inset: 0px;
          border-radius: 0.5rem;
          background-color: ${theme?.colors?.slate?.[600] ??
          defaultTheme.colors.slate[600]};
          mix-blend-mode: color;
        `;
      case 'outline':
        return css`
          inset: 0px;
          border: 2px solid
            ${theme?.colors?.slate?.[800] ?? defaultTheme.colors.slate[800]};
          border-radius: 0.5rem;
        `;
      case 'underline':
        if (orientation === 'horizontal') {
          return css`
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            border-radius: 0.5rem;
            background-color: ${theme?.colors?.slate?.[800] ??
            defaultTheme.colors.slate[800]};
            mix-blend-mode: color;
          `;
        }

        return css`
          bottom: 0;
          right: 0;
          width: 1px;
          height: 100%;
          border-radius: 0.5rem;
          background-color: ${theme?.colors?.slate?.[800] ??
          defaultTheme.colors.slate[800]};
          mix-blend-mode: color;
        `;
      case 'enclosed':
        return css`
          inset: 0px;
          border: 1px solid
            ${theme?.colors?.slate?.[800] ?? defaultTheme.colors.slate[800]};
          margin-bottom: -1px;
          border-bottom: none;
          border-radius: 0.5rem 0.5rem 0 0;
          background-color: ${theme?.colors?.white ??
          defaultTheme.colors.white};
          mix-blend-mode: difference;
        `;
      case 'base':
      default:
        return css`
          display: none;
        `;
    }
  }}
`;

export const StyledTabPanel = styled(TabPanel)`
  display: flex;
  flex-grow: 1;
  padding: 1rem 0;
`;
