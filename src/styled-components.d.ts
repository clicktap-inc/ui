import 'styled-components';
import type { CSSProp } from 'styled-components';
import { storybookTheme } from '../storybook.theme';

type Theme = typeof storybookTheme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}
