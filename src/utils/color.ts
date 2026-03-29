const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/** Check if a string is a valid hex color. */
export function isValidHex(hex: string | null | undefined): boolean {
  return hex !== null && hex !== undefined && HEX_PATTERN.test(hex);
}

/** Very light colors (white, near-white) need a border and dark checkmark. */
export function isVeryLight(hex: string | null): boolean {
  if (!hex || !isValidHex(hex)) {
    return false;
  }
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 230;
}
