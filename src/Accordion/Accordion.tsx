import { AccordionProps, AccordionItemProps } from '@nextui-org/accordion';
import { StyledAccordion } from './styles';

export function Accordion({ children, ...props }: AccordionProps) {
  const itemClasses = {
    base: 'accordion-base',
    heading: 'accordion-heading',
    trigger: 'accordion-trigger',
    titleWrapper: 'accordion-title_wrapper',
    title: 'accordion-title',
    subtitle: 'accordion-subtitle',
    startContent: 'accordion-start_content',
    indicator: 'accordion-indicator',
    content: 'accordion-content',
  } as AccordionItemProps['classNames'];

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledAccordion itemClasses={itemClasses} {...props}>
      {children}
    </StyledAccordion>
  );
}

export default Accordion;
