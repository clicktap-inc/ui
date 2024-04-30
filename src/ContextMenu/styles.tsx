import { styled } from 'styled-components';
import { Popover } from 'react-aria-components';
import { motion } from 'framer-motion';
import { defaultTheme } from '../defaultTheme';

export const StyledPopover = styled(motion(Popover))`
  padding: 0.4rem 0;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.375rem;
  width: 14rem;
  background: ${({ theme }) =>
    theme?.colors?.white ?? defaultTheme.colors.white};
  border: 1px solid
    ${({ theme }) =>
      theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
`;

export default StyledPopover;
