// import {
//   Content,
//   Indicator,
//   Link,
//   List,
//   Root,
//   Trigger,
//   Viewport,
// } from '@radix-ui/react-navigation-menu';
// import { Link as AriaLink } from 'react-aria-components';
// import { keyframes, styled } from 'styled-components';
// import { defaultTheme } from '../defaultTheme';

// const enterFromRight = keyframes`
//   from {
//     opacity: 0;
//     transform: translateX(200px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// `;

// const enterFromLeft = keyframes`
//   from {
//     opacity: 0;
//     transform: translateX(-200px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(0);
//   }
// `;

// const exitToRight = keyframes`
//   from {
//     opacity: 1;
//     transform: translateX(0);
//   }
//   to {
//     opacity: 0;
//     transform: translateX(200px);
//   }
// `;

// const exitToLeft = keyframes`
//   from {
//     opacity: 1;
//     transform: translateX(0);
//   }
//   to {
//     opacity: 0;
//     transform: translateX(-200px);
//   }
// `;

// const scaleIn = keyframes`
//   from {
//     opacity: 0;
//     transform: rotateX(-30deg) scale(0.9);
//   }
//   to {
//     opacity: 1;
//     transform: rotateX(0deg) scale(1);
//   }
// `;

// const scaleOut = keyframes`
//   from {
//     opacity: 1;
//     transform: rotateX(0deg) scale(1);
//   }
//   to {
//     opacity: 0;
//     transform: rotateX(-10deg) scale(0.95);
//   }
// `;

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const fadeOut = keyframes`
//   from {
//     opacity: 1;
//   }
//   to {
//     opacity: 0;
//   }
// `;

// export const CaretDown = styled.svg`
//   position: relative;
//   color: ${({ theme }) =>
//     theme?.colors?.slate?.[900] ?? defaultTheme.colors.slate[900]};
//   top: 1px;
//   transition: transform 200ms ease;
// `;

// export const StyledRoot = styled(Root)`
//   position: relative;
//   display: flex;
//   width: 100%;
//   justify-content: center;
//   z-index: 1;
// `;

// export const StyledList = styled(List)`
//   display: flex;
//   justify-content: center;
//   list-style: none;
//   margin: 0;
//   padding: 0;
// `;

// export const StyledTrigger = styled(Trigger)`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 0.5rem;
//   padding: 8px 12px;
//   outline: none;
//   user-select: none;
//   font-weight: 500;
//   line-height: 1;
//   border-radius: 4px;
//   border: none;
//   cursor: pointer;
//   background-color: transparent;
//   font-size: 0.9rem;
//   color: ${({ theme }) =>
//     theme?.colors?.slate?.[900] ?? defaultTheme.colors.slate[900]};
//   transition: all 200ms ease;

//   &:focus {
//     box-shadow: 0 0 0 2px
//       ${({ theme }) =>
//         theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};
//   }

//   &:hover {
//     background-color: ${({ theme }) =>
//       theme?.colors?.slate?.[100] ?? defaultTheme.colors.slate[100]};
//   }

//   &[data-state='open'] > ${CaretDown} {
//     transform: rotate(-180deg);
//   }
// `;

// export const StyledLink = styled(Link)`
//   display: block;
//   text-decoration: none;
//   font-size: 0.9rem;
//   line-height: 1;
//   padding: 8px 12px;
//   outline: none;
//   user-select: none;
//   font-weight: 500;
//   line-height: 1;
//   border-radius: 4px;
//   font-size: 0.9rem;
//   border: none;
//   background-color: transparent;
//   color: ${({ theme }) =>
//     theme?.colors?.slate?.[900] ?? defaultTheme.colors.slate[900]};
//   transition: all 200ms ease;

//   &:focus {
//     box-shadow: 0 0 0 2px
//       ${({ theme }) =>
//         theme?.colors?.slate?.[200] ?? defaultTheme.colors.slate[200]};
//   }

//   &:hover {
//     background-color: ${({ theme }) =>
//       theme?.colors?.slate?.[100] ?? defaultTheme.colors.slate[100]};
//   }
// `;

// export const StyledContent = styled(Content)`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   animation-duration: 250ms;
//   animation-timing-function: ease;

//   &[data-motion='from-start'] {
//     animation-name: ${enterFromLeft};
//   }
//   &[data-motion='from-end'] {
//     animation-name: ${enterFromRight};
//   }
//   &[data-motion='to-start'] {
//     animation-name: ${exitToLeft};
//   }
//   &[data-motion='to-end'] {
//     animation-name: ${exitToRight};
//   }

//   @media only screen and (min-width: 600px) {
//     width: auto;
//   }
// `;

// export const StyledIndicator = styled(Indicator)`
//   display: flex;
//   align-items: flex-end;
//   justify-content: center;
//   height: 10px;
//   top: 100%;
//   overflow: hidden;
//   z-index: 1;
//   transition: width, transform 250ms ease;

//   &[data-state='visible'] {
//     animation: ${fadeIn} 200ms ease;
//   }

//   &[data-state='hidden'] {
//     animation: ${fadeOut} 200ms ease;
//   }
// `;

// /** @todo min-height/width instead? configurable? */
// export const StyledViewport = styled(Viewport)`
//   position: relative;
//   transform-origin: top center;
//   margin-top: 10px;
//   width: 100%;
//   background-color: ${({ theme }) =>
//     theme?.colors?.white ?? defaultTheme.colors.white};
//   border-radius: 6px;
//   overflow: hidden;
//   box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
//   height: var(--radix-navigation-menu-viewport-height);
//   transition: width, height, 300ms ease;

//   &[data-state='open'] {
//     animation: ${scaleIn} 200ms ease;
//   }

//   &[data-state='closed'] {
//     animation: ${scaleOut} 200ms ease;
//   }

//   @media only screen and (min-width: 600px) {
//     width: var(--radix-navigation-menu-viewport-width);
//   }
// }
// `;

// export const StyledUl = styled.ul`
//   display: grid;
//   padding: 22px;
//   margin: 0;
//   column-gap: 10px;
//   list-style: none;

//   @media only screen and (min-width: 600px) {
//     &.one {
//       width: 500px;
//       grid-template-columns: 0.75fr 1fr;
//     }
//     &.two {
//       width: 600px;
//       grid-auto-flow: column;
//       grid-template-rows: repeat(3, 1fr);
//     }
//   }
// `;

// export const ListItemLink = styled(AriaLink)`
//   display: block;
//   outline: none;
//   text-decoration: none;
//   user-select: none;
//   padding: 12px;
//   border-radius: 0.375rem;
//   font-size: 0.9rem;
//   line-height: 1;
//   transition: background-color 200ms ease;

//   &:focus {
//     box-shadow: 0 0 0 2px
//       ${({ theme }) =>
//         theme?.colors?.slate?.[900] ?? defaultTheme.colors.slate[900]};
//   }

//   &:hover {
//     background-color: ${({ theme }) =>
//       theme?.colors?.slate?.[100] ?? defaultTheme.colors.slate[100]};
//   }
// `;

// export const ListItemHeading = styled.div`
//   font-weight: 500;
//   line-height: 1.2;
//   margin-bottom: 5px;
//   color: ${({ theme }) =>
//     theme?.colors?.slate?.[900] ?? defaultTheme.colors.slate[900]};
// `;

// export const ListItemText = styled.p`
//   color: ${({ theme }) =>
//     theme?.colors?.slate?.[900] ?? defaultTheme.colors.slate[900]};
//   line-height: 1.4;
//   font-weight: initial;
// `;

// export const Callout = styled(AriaLink)`
//   display: flex;
//   justify-content: flex-end;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(
//     135deg,
//     ${({ theme }) =>
//         theme?.colors?.violet?.[500] ?? defaultTheme.colors.violet[500]}
//       0%,
//     ${({ theme }) =>
//         theme?.colors?.indigo?.[500] ?? defaultTheme.colors.indigo[500]}
//       100%
//   );
//   border-radius: 0.375rem;
//   padding: 25px;
//   text-decoration: none;
//   outline: none;
//   user-select: none;

//   &:focus {
//     box-shadow: 0 0 0 2px
//       ${({ theme }) =>
//         theme?.colors?.slate?.[900] ?? defaultTheme.colors.slate[900]};
//   }
// `;

// export const CalloutHeading = styled.div`
//   color: white;
//   font-size: 18px;
//   font-weight: 500;
//   line-height: 1.2;
//   margin-top: 16px;
//   margin-bottom: 7px;
// `;

// export const CalloutText = styled.p`
//   color: white;
//   font-size: 14px;
//   line-height: 1.3;
// `;

// export const ViewportPosition = styled.div`
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   width: 100%;
//   top: 100%;
//   left: 0;
//   perspective: 2000px;
// `;

// export const Arrow = styled.div`
//   position: relative;
//   top: 70%;
//   background-color: white;
//   width: 10px;
//   height: 10px;
//   transform: rotate(45deg);
//   border-top-left-radius: 2px;
// `;
