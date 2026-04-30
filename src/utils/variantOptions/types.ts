/**
 * Minimal structural shape required by `filterAvailableOptions`,
 * `findVariant`, etc. Real-world variants typically carry far more data;
 * the generic functions only read `attributes[].attribute.code` and
 * `attributes[].option.code` (and optionally `option.id` for `findVariant`).
 */
export interface VariantAttribute {
  attribute: { code: string };
  option: { code: string; id?: string | null };
}

export interface VariantLike {
  attributes: VariantAttribute[];
}
