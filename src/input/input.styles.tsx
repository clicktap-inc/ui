import styled from 'styled-components';
import {
  FieldError,
  Input,
  Label,
  Text,
  TextField,
} from 'react-aria-components';

export const StyledInput = styled(Input)`
  border: 1px solid ${({ theme }) => theme.colors.slate[300]};
  font-size: 0.9rem;
  padding: 0.5rem;
  margin: 0;
  border-radius: 0.375rem;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.slate[900]};
  width: 100%;
  transition: all ease 200ms;

  &[data-hovered] {
    border: 1px solid ${({ theme }) => theme.colors.slate[400]};
  }

  &[data-focused] {
    border: 1px solid ${({ theme }) => theme.colors.slate[400]};
    outline: 2px solid ${({ theme }) => theme.colors.slate[200]};
  }

  &[data-disabled] {
    border: 1px solid ${({ theme }) => theme.colors.slate[200]};
    background: ${({ theme }) => theme.colors.slate[100]};
  }

  &[data-invalid] {
    border: 1px solid ${({ theme }) => theme.colors.red[500]};
    background: ${({ theme }) => theme.colors.red[100]};
    color: ${({ theme }) => theme.colors.red[600]};

    &[data-focused] {
      outline: 2px solid ${({ theme }) => theme.colors.red[200]};
    }
  }
`;

export const StyledLabel = styled(Label)`
  display: flex;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const StyledTextField = styled(TextField)`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({ theme }) => theme.colors.slate[900]};
`;

export const StyledFieldError = styled(FieldError)`
  display: flex;
  color: ${({ theme }) => theme.colors.red[500]};
  font-size: 0.8rem;
`;

export const StyledText = styled(Text)`
  display: flex;
  color: ${({ theme }) => theme.colors.slate[500]};
  font-size: 0.8rem;
`;

// import styled, { css } from 'styled-components';
// import { defaultTheme } from '../theming/theming';
// import { InputProps, LabelProps } from './input.props';
// import { spacing } from '../spacing/spacing.styles';

// export const StyledInput = styled.input<InputProps>`
//   appearance: none;
//   display: block;
//   background-color: ${(props) => {
//     switch (props.variant) {
//       case 'filled':
//         return (
//           props.theme.colors?.slate?.[100] ?? defaultTheme.colors.slate[100]
//         );
//       case 'outlined':
//       case 'standard':
//       default:
//         return props.theme.colors?.white ?? defaultTheme.colors.white;
//     }
//   }};
//   font-size: ${(props) => {
//     switch (props.inputSize) {
//       case 'sm':
//         return '0.875rem';
//       case 'lg':
//         return '1.125rem';
//       case 'md':
//       default:
//         return '1rem';
//     }
//   }};
//   line-height: ${(props) => {
//     switch (props.inputSize) {
//       case 'sm':
//         return Object.keys(props.theme).length === 0
//           ? defaultTheme.lineHeight[5]
//           : props.theme.lineHeight?.[5];
//       case 'lg':
//         return Object.keys(props.theme).length === 0
//           ? defaultTheme.lineHeight[7]
//           : props.theme.lineHeight?.[7];
//       case 'md':
//       default:
//         return Object.keys(props.theme).length === 0
//           ? defaultTheme.lineHeight[6]
//           : props.theme.lineHeight?.[6];
//     }
//   }};
//   border-color: ${(props) => {
//     switch (props.state) {
//       case 'error':
//         return Object.keys(props.theme).length === 0
//           ? defaultTheme.colors.red[300]
//           : props.theme.colors?.red?.[300];
//       case 'success':
//         return Object.keys(props.theme).length === 0
//           ? defaultTheme.colors.green[500]
//           : props.theme.colors?.green?.[500];
//       case 'idle':
//       default:
//         return Object.keys(props.theme).length === 0
//           ? defaultTheme.colors.gray[300]
//           : props.theme.colors?.gray?.[300];
//     }
//   }};
//   border-radius: ${(props) => {
//     switch (props.shape) {
//       case 'round':
//         switch (props.inputSize) {
//           case 'sm':
//             return Object.keys(props.theme).length === 0
//               ? defaultTheme.borderRadius[1.5]
//               : props.theme.borderRadius?.[1.5];
//           case 'lg':
//             return Object.keys(props.theme).length === 0
//               ? defaultTheme.borderRadius[2]
//               : props.theme.borderRadius?.[2];
//           case 'md':
//           default:
//             return Object.keys(props.theme).length === 0
//               ? defaultTheme.borderRadius[1.5]
//               : props.theme.borderRadius?.[1.5];
//         }
//       case 'square':
//       default:
//         return '0';
//     }
//   }};
//   border-width: ${(props) => {
//     switch (props.labelPosition) {
//       case 'overlap':
//       case 'inside':
//         return '0';
//       case 'outside':
//       default:
//         switch (props.variant) {
//           case 'outlined':
//             return '1px';
//           case 'standard':
//           case 'filled':
//           default:
//             return '0 0 1px';
//         }
//     }
//   }};
//   border-style: solid;
//   outline: 0;
//   width: ${(props) => {
//     switch (props.inputWidth) {
//       case 'full':
//         return '100%';
//       case 'auto':
//       default:
//         return 'auto';
//     }
//   }};
//   padding: ${(props) => {
//     switch (props.labelPosition) {
//       case 'overlap':
//       case 'inside':
//         return '0';
//       case 'outside':
//       default:
//         return '0.5rem 0.75rem';
//     }
//   }};

//   ${(props) => props.disabled && `opacity: 0.5; `}

//   ${(props) => spacing(props)}

//   &:focus {
//     border-color: ${(props) => {
//       switch (props.state) {
//         case 'error':
//           return Object.keys(props.theme).length === 0
//             ? defaultTheme.colors.red[500]
//             : props.theme.colors?.red?.[500];
//         case 'success':
//           return Object.keys(props.theme).length === 0
//             ? defaultTheme.colors.green[600]
//             : props.theme.colors?.green?.[600];
//         case 'idle':
//         default:
//           return Object.keys(props.theme).length === 0
//             ? defaultTheme.colors.indigo[500]
//             : props.theme.colors?.indigo?.[500];
//       }
//     }};
//   }
// `;

// export const StyledLabel = styled.label<LabelProps>`
//   font-size: ${(props) => {
//     switch (props.labelPosition) {
//       case 'overlap':
//       case 'inside':
//         return '0.75rem';
//       case 'outside':
//       default:
//         return '0.875rem';
//     }
//   }};
//   position: ${(props) => {
//     switch (props.labelPosition) {
//       case 'overlap':
//         return 'absolute';
//       case 'inside':
//       case 'outside':
//       default:
//         return 'static';
//     }
//   }};
//   ${(props) =>
//     props.labelPosition === 'overlap' &&
//     css`
//       padding: 0 0.25rem;
//       left: 0.5rem;
//       top: -0.625rem;
//       background: #fff;
//     `}
//   line-height: 1.25rem;
//   font-weight: 500;
//   color: ${defaultTheme.colors.gray[700]};
// `;

// export const LabelTopWrap = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// export const InputGroupWrap = styled.div<InputProps>`
//   position: relative;
//   -webkit-font-smoothing: antialiased;
//   width: ${(props) => {
//     switch (props.inputWidth) {
//       case 'full':
//         return '100%';
//       case 'auto':
//       default:
//         return 'auto';
//     }
//   }};
// `;
// export const InputWrap = styled.div<InputProps>`
//   position: relative;
//   padding: ${(props) => {
//     switch (props.labelPosition) {
//       case 'overlap':
//       case 'inside':
//         return '0.5rem 0.75rem;';
//       case 'outside':
//       default:
//         return '0';
//     }
//   }};
//   border-style: solid;
//   border-width: ${(props) => {
//     switch (props.labelPosition) {
//       case 'overlap':
//       case 'inside':
//         switch (props.variant) {
//           case 'outlined':
//             return '1px';
//           case 'standard':
//           case 'filled':
//           default:
//             return '0 0 1px';
//         }
//       case 'outside':
//       default:
//         return '0';
//     }
//   }};

//   border-color: ${(props) => {
//     switch (props.labelPosition) {
//       case 'overlap':
//       case 'inside':
//         switch (props.state) {
//           case 'error':
//             return Object.keys(props.theme).length === 0
//               ? defaultTheme.colors.red[300]
//               : props.theme.colors?.red?.[300];
//           case 'success':
//             return Object.keys(props.theme).length === 0
//               ? defaultTheme.colors.green[500]
//               : props.theme.colors?.green?.[500];
//           case 'idle':
//           default:
//             return Object.keys(props.theme).length === 0
//               ? defaultTheme.colors.gray[300]
//               : props.theme.colors?.gray?.[300];
//         }
//       case 'outside':
//       default:
//         return 'transparent';
//     }
//   }};
//   border-radius: ${(props) => {
//     switch (props.labelPosition) {
//       case 'overlap':
//       case 'inside':
//         switch (props.shape) {
//           case 'round':
//             switch (props.inputSize) {
//               case 'sm':
//                 return Object.keys(props.theme).length === 0
//                   ? defaultTheme.borderRadius[1.5]
//                   : props.theme.borderRadius?.[1.5];
//               case 'lg':
//                 return Object.keys(props.theme).length === 0
//                   ? defaultTheme.borderRadius[2]
//                   : props.theme.borderRadius?.[2];
//               case 'md':
//               default:
//                 return Object.keys(props.theme).length === 0
//                   ? defaultTheme.borderRadius[1.5]
//                   : props.theme.borderRadius?.[1.5];
//             }
//           case 'square':
//           default:
//             return '0';
//         }
//       case 'outside':
//       default:
//         return '0';
//     }
//   }};
// `;
// const AddOnStyles = css`
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   display: flex;
//   align-items: center;
// `;
// export const LeadingAddOn = styled.div`
//   ${AddOnStyles}
//   left: 0;
//   padding-left: 0.5rem;
// `;
// export const TrailingAddOn = styled.div`
//   ${AddOnStyles}
//   right: 0;
//   padding-right: 0.5rem;
// `;

// export const ShortCut = styled.kbd`
//   ${AddOnStyles}
//   right: 0.5rem;
//   font-size: 0.875rem;
//   line-height: 1.25rem;
//   color: ${defaultTheme.colors.gray[400]};
//   padding-left: 0.5rem;
//   padding-right: 0.5rem;
//   border: 1px solid ${defaultTheme.colors.gray[200]};
//   margin: 0.375rem 0;
//   border-radius: 0.25rem;
// `;

// export const HelperText = styled.p`
//   margin-top: 0.5rem;
//   font-size: 0.875rem;
//   line-height: 1.25rem;
//   color: ${defaultTheme.colors.gray[500]};
// `;

// export const ErrorText = styled.p`
//   margin-top: 0.5rem;
//   font-size: 0.875rem;
//   line-height: 1.25rem;
//   color: ${defaultTheme.colors.red[600]};
// `;

// export const CornerHint = styled.span`
//   font-size: 0.875rem;
//   line-height: 1.25rem;
//   color: ${defaultTheme.colors.gray[500]};
// `;

// export default {
//   StyledInput,
//   StyledLabel,
// };
