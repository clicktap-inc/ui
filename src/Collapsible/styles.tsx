import { styled } from 'styled-components';
import { motion } from 'framer-motion';

export const CollapsibleRoot = styled.div`
  width: 100%;
`;

export const CollapsibleContentRoot = styled(motion.div)`
  width: 100%;
  overflow: hidden;
`;
