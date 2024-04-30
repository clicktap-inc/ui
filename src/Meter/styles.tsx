import { styled } from 'styled-components';
import { Meter, Label } from 'react-aria-components';
import { motion } from 'framer-motion';
import { defaultTheme } from '../defaultTheme';

export const StyledMeter = styled(Meter)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StyledMeterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const StyledLabel = styled(Label)`
  font-size: 0.875rem;
`;

export const StyledValue = styled.span`
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  margin-left: auto;
`;

export const StyledBar = styled.div`
  height: 0.625rem;
  border-radius: 0.3rem;
  background-color: ${({ theme }) =>
    theme?.colors?.slate?.[300] ?? defaultTheme.colors.slate[300]};
  forced-color-adjust: none;
  overflow: hidden;
`;

export const StyledBarFill = styled(motion.div)`
  height: 100%;
  background-color: ${({ theme }) =>
    theme?.colors?.slate?.[800] ?? defaultTheme.colors.slate[800]};
`;
