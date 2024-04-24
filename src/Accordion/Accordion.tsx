import { AccordionProps } from '@nextui-org/accordion';
import { StyledAccordion } from './styles';

export function Accordion({ children, ...props }: AccordionProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledAccordion {...props}>{children}</StyledAccordion>;
}

export default Accordion;
