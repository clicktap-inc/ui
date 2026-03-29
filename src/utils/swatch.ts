/**
 * Swatch renderer constants matching SwatchRenderer enum values
 * from ProductAttributeSwatch.filterRenderer / listRenderer / detailRenderer.
 */
export const SwatchRenderer = {
  SWATCH: 'SWATCH',
  IMAGE: 'IMAGE',
  PRODUCT_IMAGE: 'PRODUCT_IMAGE',
  TEXT: 'TEXT',
} as const;

export type SwatchRendererType =
  (typeof SwatchRenderer)[keyof typeof SwatchRenderer];

const URL_PATTERN = /^(https?:\/\/|\/)/;

/** Check if a string looks like a valid image URL (http(s) or absolute path). */
export function isValidImageUrl(value: string | null | undefined): boolean {
  return value !== null && value !== undefined && URL_PATTERN.test(value);
}

export function isSwatchRenderer(
  value: string | null | undefined,
): value is SwatchRendererType {
  return (
    value === SwatchRenderer.SWATCH ||
    value === SwatchRenderer.IMAGE ||
    value === SwatchRenderer.PRODUCT_IMAGE ||
    value === SwatchRenderer.TEXT
  );
}
