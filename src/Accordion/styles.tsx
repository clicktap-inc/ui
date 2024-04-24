import styled from 'styled-components';
import { Accordion } from '@nextui-org/accordion';

export const StyledAccordion = styled(Accordion)`
  width: 100%;
  margin-bottom: 2rem;

  hr {
    border-width: 1px 0 0;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors?.slate?.[200]};
  }

  h2 {
    margin: 0;
  }

  section {
    font-size: 0.9rem;
  }

  button {
    appearance: none;
    box-sizing: border-box;
    text-overflow: ellipsis;
    cursor: default;
    background-color: inherit;
    text-align: start;
    border: 0;
    width: 100%;
    margin: 0;
    padding: 1rem 0;
    font-family: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .text-large {
      font-size: 1rem;
      line-height: 1.5;
      font-weight: 600;
      display: block;
    }

    .text-small {
      font-size: 0.9rem;
      font-weight: 400;
      display: block;
    }

    svg {
      width: 1rem;
      height: 1rem;
    }

    &:not([data-focus-visible='true']) {
      outline: 0;
    }

    > span {
      transition: transform 300ms ease;

      &[data-open='true'] {
        transform: rotate(-90deg);
      }
    }
  }
`;

export default StyledAccordion;
