import { defaultTheme, mergeTheme } from '@clicktap/ui-kit';
// import type { Theme } from '@clicktap/ui-kit';
import { Inter } from 'next/font/google';
import { createGlobalStyle } from 'styled-components';

const inter = Inter({ subsets: ['latin'] });

export const storybookTheme = mergeTheme(defaultTheme, {
  fontFamily: {
    sans: [inter.style.fontFamily],
  },
  components: {
    Card: {
      padding: '2rem',
      border: `1px solid ${defaultTheme.colors.slate[200]}`,
      boxShadow: 'none',
      borderRadius: '0.375rem',
    },
    'Card.Header': {
      marginBottom: '1.5rem',
    },
  },
});

export const GlobalStyle = createGlobalStyle`
    html {
        font-family: ${inter.style.fontFamily};
        height: 100%;
    }

    html, body, #__next {
        height: 100%;
    }

    *,
    ::before,
    ::after {
        box-sizing: border-box; /* 1 */
    }
`;
