export interface TypographyProps {
  fontFamily?: string;
  fontSize?: string;
  fontSmoothing?: 'antialiased' | 'subpixel-antialiased';
  fontStyle?: 'italic' | 'normal';
  fontWeight?: string | number;
  fontVariantNumeric?: string;
  letterSpacing?: string | number;
  lineHeight?: string | number;
  listStyleType?: string;
  listStylePosition?: string;
  textAlign?: string;
  textColor?: string;
  textDecoration?: string;
  textDecorationColor?: string;
  textDecorationStyle?: string;
  textDecorationThickness?: string;
  textUnderlineOffset?: string;
  textTransform?: string;
  textOverflow?: 'ellipsis' | 'clip' | 'truncate';
  textIndent?: string | number;
  verticalAlign?: string;
  whitespace?: string;
  break?: 'normal' | 'words' | 'all';
}
