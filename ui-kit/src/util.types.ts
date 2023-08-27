export type Primitive =
  | null
  | undefined
  | number
  | bigint
  | symbol
  | boolean
  | string;

export type AcceptableValues<
  PreDefinedValues extends BasicUserDefinedType,
  BasicUserDefinedType,
  BaseResultType extends NonNullable<Primitive> = string
> = (BaseResultType & Record<never, never>) | PreDefinedValues;
