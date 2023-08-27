export interface MarginProps {
  m?: string | number;
  mb?: string | number;
  ml?: string | number;
  mr?: string | number;
  mt?: string | number;
  mx?: string | number;
  my?: string | number;
}

export interface PaddingProps {
  p?: string | number;
  pb?: string | number;
  pl?: string | number;
  pr?: string | number;
  pt?: string | number;
  px?: string | number;
  py?: string | number;
}

export interface SpacingProps extends MarginProps, PaddingProps {}
