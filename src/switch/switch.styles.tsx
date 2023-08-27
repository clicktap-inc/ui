import { styled } from '../theming/theming';

export const SwitchWrap = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: default;
`;

// ml-auto pointer-events-auto h-6 w-10 rounded-full p-1 ring-1 ring-inset transition duration-200 ease-in-out bg-slate-900/10 ring-slate-900/5
export const Rail = styled.div<{ isChecked: boolean }>`
  pointer-events: auto;
  height: 2rem;
  width: 3.5rem;
  border-radius: 9999px;
  padding: 0.375rem;
  background-color: ${({ isChecked, theme }) =>
    isChecked ? theme.colors?.blue?.[500] : 'rgb(15 23 42 / 0.1)'};
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
`;

// h-4 w-4 rounded-full bg-white shadow-sm ring-1 ring-slate-700/10 transition duration-200 ease-in-out
export const Toggle = styled.div<{ isChecked: boolean }>`
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors?.white};
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;

  ${({ isChecked }) =>
    isChecked &&
    `
    transform: translateX(1.5rem);
  `}
`;

export const HiddenCheckboxInput = styled.input`
  position: absolute;
  left: -9999px;
  visibility: hidden;
  pointer-events: none;
`;

export default HiddenCheckboxInput;
