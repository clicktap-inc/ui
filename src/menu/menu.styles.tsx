import { styled } from '../theming/theming';

export const SubmenuWrap = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors?.slate?.[200] ?? '#e2e8f0'};
  border-radius: 5px;
`;

export default SubmenuWrap;
