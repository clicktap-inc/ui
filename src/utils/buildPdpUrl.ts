/**
 * Append configurable-product variant selections to a PDP canonical URL as
 * `?attributeCode=optionCode` pairs (e.g. `?color=black`). Mirrors the
 * encoding produced by `ProductTypeResolver.writeSelectionsToUrl` so deep
 * links land on the exact variant.
 *
 * Accepts the structural shape that any cart-item / order-item / quote-item
 * `typeOptions` produces on the configurable case — both consumers (order
 * success page, cart drawer) share this.
 *
 * Returns the URL unchanged when:
 *   - the URL is null/empty,
 *   - the item isn't configurable (no attributes), or
 *   - the existing URL already carries a query string (we don't merge —
 *     the item's own variant context is authoritative, and bailing keeps
 *     caller intent clear).
 */
type ConfigurableTypeOptionsLike = {
  attributes?: Array<{
    attribute?: { code?: string | null } | null;
    option?: { code?: string | null } | null;
  }> | null;
};

export function buildPdpUrl(
  canonicalUrl: string | null | undefined,
  typeOptions: unknown,
): string | null {
  if (!canonicalUrl) {
    return null;
  }

  const attributes = (typeOptions as ConfigurableTypeOptionsLike | null)
    ?.attributes;
  if (!attributes?.length) {
    return canonicalUrl;
  }

  if (canonicalUrl.includes('?')) {
    return canonicalUrl;
  }

  const sp = new URLSearchParams();
  for (const attr of attributes) {
    const code = attr.attribute?.code;
    const value = attr.option?.code;
    if (code && value) {
      sp.set(code, value);
    }
  }

  const query = sp.toString();
  return query ? `${canonicalUrl}?${query}` : canonicalUrl;
}
