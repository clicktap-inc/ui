import styled from 'styled-components';

export const CheckboxWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxInput = styled.input`
  appearance: none;
  user-select: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors?.slate?.[300]};
  background-color: ${({ theme }) => theme.colors?.white};
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;

  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
    background-color: ${({ theme }) => theme.colors?.blue?.[500]};
    border: 1px solid ${({ theme }) => theme.colors?.blue?.[500]};
  }
`;

export const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors?.slate?.[900]};
  margin-left: 0.5rem;
`;

export default CheckboxInput;
