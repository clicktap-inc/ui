'use client';

type ProductPriceProps = {
  product: {
    type: { code: string };
    price?: number;
    minPrice?: number | null;
    maxPrice?: number | null;
  };
};

const fmt = (v: number) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(v);

export function ProductPrice({ product }: ProductPriceProps) {
  const typeCode = product.type.code;

  if (typeCode === 'simple' && product.price != null) {
    return <span className="text-black">{fmt(product.price)}</span>;
  }

  if (typeCode === 'configurable') {
    const min = product.minPrice ?? 0;
    const max = product.maxPrice ?? 0;

    if (min === 0 && max === 0) return null;

    const label =
      min !== max && max > 0 ? `${fmt(min)} - ${fmt(max)}` : fmt(min);

    return <span className="text-black">{label}</span>;
  }

  return null;
}
