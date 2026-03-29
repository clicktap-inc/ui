'use client';

import { Button } from 'react-aria-components';
import { cn } from '../../../utils/cn';
import { CheckIcon } from '../../Icon/CheckIcon';
import { isDevelopment } from '../../../utils/env';
import { isVeryLight, isValidHex } from '../../../utils/color';
import {
  SwatchRenderer,
  isSwatchRenderer,
  isValidImageUrl,
} from '../../../utils/swatch';
import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAvailableInterface,
} from '../../../types/collection';

type AvailableFilter =
  | CollectionFilterAvailableInterface
  | CollectionFilterAppliedInterface;

type SwatchData = {
  hex?: string | null;
  imageUrl?: string | null;
  text?: string | null;
};

type SwatchLookup = Map<
  string,
  SwatchData & { attributeCode: string; optionCode: string }
>;

/** Build a map of option ID → swatch data from swatch-enabled filter data. */
function buildSwatchLookup(availableFilters: AvailableFilter[]): SwatchLookup {
  const lookup: SwatchLookup = new Map();
  for (const filter of availableFilters) {
    if (
      'renderer' in filter &&
      isSwatchRenderer(filter.renderer) &&
      'options' in filter
    ) {
      for (const opt of (
        filter as {
          code: string;
          options: {
            id: string;
            code: string;
            swatch?: SwatchData | null;
          }[];
        }
      ).options) {
        if (opt.swatch) {
          lookup.set(opt.id, {
            ...opt.swatch,
            attributeCode: filter.code,
            optionCode: opt.code,
          });
        }
      }
    }
  }
  return lookup;
}

type Variant = {
  price?: number | null;
  attributes: {
    attribute: { code: string };
    option: { id: string; code: string; label: string };
  }[];
  simpleProduct: { image?: string | null; sku: string };
};

type AttributeSwatchConfig = {
  code: string;
  swatch?: { listRenderer?: string | null } | null;
};

type SwatchOption = {
  optionId: string;
  optionCode: string;
  attributeCode: string;
  label: string;
  swatch: SwatchData;
  image: string | null;
};

/** Extract unique swatch options from variants, cross-referencing filter swatch data. */
function getSwatchOptions(
  variants: Variant[],
  swatchLookup: SwatchLookup,
  listRenderers: Map<string, string>,
): SwatchOption[] {
  const seen = new Set<string>();
  const options: SwatchOption[] = [];

  for (const variant of variants) {
    for (const attr of variant.attributes) {
      const swatch = swatchLookup.get(attr.option.id);
      if (
        swatch &&
        !seen.has(attr.option.id) &&
        listRenderers.has(attr.attribute.code)
      ) {
        seen.add(attr.option.id);
        options.push({
          optionId: attr.option.id,
          optionCode: swatch.optionCode,
          attributeCode: attr.attribute.code,
          label: attr.option.label,
          swatch,
          image: variant.simpleProduct.image ?? null,
        });
      }
    }
  }

  return options;
}

type ProductCardSwatchesProps = {
  variants: Variant[];
  availableFilters: AvailableFilter[];
  attributeSwatchConfigs?: AttributeSwatchConfig[];
  matchedOptionIds: string[];
  selectedOptionId: string | null;
  onSelect: (
    optionId: string,
    optionCode: string,
    image: string | null,
    attributeCode: string,
  ) => void;
};

export function ProductCardSwatches({
  variants,
  availableFilters,
  attributeSwatchConfigs = [],
  matchedOptionIds,
  selectedOptionId,
  onSelect,
}: ProductCardSwatchesProps) {
  // Build listRenderer lookup per attribute code
  const listRenderers = new Map<string, string>();
  for (const attr of attributeSwatchConfigs) {
    if (attr.swatch?.listRenderer) {
      if (isDevelopment && !isSwatchRenderer(attr.swatch.listRenderer)) {
        console.warn(
          `[Swatch] Unknown listRenderer "${attr.swatch.listRenderer}" for attribute "${attr.code}" — skipping list swatches`,
        );
      }
      listRenderers.set(attr.code, attr.swatch.listRenderer);
    }
  }

  const swatchLookup = buildSwatchLookup(availableFilters);
  const options = getSwatchOptions(variants, swatchLookup, listRenderers);

  if (options.length === 0) {
    return null;
  }

  // Auto-select: first matched swatch option when filtered, otherwise first option
  const optionIdSet = new Set(options.map((o) => o.optionId));
  const firstMatchedSwatch = matchedOptionIds.find((id) => optionIdSet.has(id));
  const effectiveSelected =
    selectedOptionId ?? firstMatchedSwatch ?? options[0]?.optionId ?? null;

  // Get the renderer for the first option's attribute (all options share the same renderer)
  const renderer = options[0]
    ? (listRenderers.get(options[0].attributeCode) ?? null)
    : null;

  return (
    <div className="flex flex-row flex-wrap items-center gap-1.5 mt-1.5">
      {options.map((opt) => {
        const isSelected = effectiveSelected === opt.optionId;

        if (renderer === SwatchRenderer.IMAGE) {
          return (
            <Button
              key={opt.optionId}
              aria-label={opt.label}
              className="cursor-pointer p-0"
              onPress={() => {
                onSelect(
                  opt.optionId,
                  opt.optionCode,
                  opt.image,
                  opt.attributeCode,
                );
              }}
            >
              {({ isHovered }) => (
                <span
                  className={cn(
                    'block w-8 aspect-[2.2/1] border bg-contain bg-center bg-no-repeat transition-all duration-150',
                    isSelected
                      ? 'border-slate-900 ring-1 ring-slate-900'
                      : 'border-slate-200',
                    isHovered && !isSelected && 'border-slate-400',
                  )}
                  title={opt.label}
                  style={
                    opt.swatch.imageUrl
                      ? { backgroundImage: `url(${opt.swatch.imageUrl})` }
                      : undefined
                  }
                />
              )}
            </Button>
          );
        }

        if (renderer === SwatchRenderer.TEXT) {
          return (
            <Button
              key={opt.optionId}
              aria-label={opt.label}
              className="cursor-pointer p-0"
              onPress={() => {
                onSelect(
                  opt.optionId,
                  opt.optionCode,
                  opt.image,
                  opt.attributeCode,
                );
              }}
            >
              {({ isHovered }) => (
                <span
                  className={cn(
                    'inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium border transition-colors duration-150',
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300',
                    isHovered && !isSelected && 'border-slate-500',
                  )}
                >
                  {opt.swatch.text ?? opt.label}
                </span>
              )}
            </Button>
          );
        }

        // SWATCH (default) — imageUrl takes priority over hex
        const hasImage = isValidImageUrl(opt.swatch.imageUrl);
        const hasHex = isValidHex(opt.swatch.hex);
        if (!hasImage && !hasHex) {
          if (isDevelopment) {
            const reasons: string[] = [];
            if (opt.swatch.hex && !hasHex) {
              reasons.push(`invalid hex "${opt.swatch.hex}"`);
            }
            if (opt.swatch.imageUrl && !hasImage) {
              reasons.push(`invalid imageUrl "${opt.swatch.imageUrl}"`);
            }
            if (!opt.swatch.hex && !opt.swatch.imageUrl) {
              reasons.push('missing hex and imageUrl');
            }
            console.warn(
              `[Swatch] Skipping list swatch for attribute "${opt.attributeCode}" option "${opt.optionCode}" — ${reasons.join('; ')}`,
            );
          }
          return null;
        }
        if (isDevelopment && opt.swatch.imageUrl && !hasImage) {
          console.warn(
            `[Swatch] Falling back to SWATCH (hex) renderer for attribute "${opt.attributeCode}" option "${opt.optionCode}" — invalid imageUrl "${opt.swatch.imageUrl}"`,
          );
        }
        const needsBorder = hasImage
          ? false
          : isVeryLight(opt.swatch.hex ?? null);
        const circleStyle = hasImage
          ? { backgroundImage: `url(${opt.swatch.imageUrl})` }
          : { backgroundColor: opt.swatch.hex ?? undefined };
        return (
          <Button
            key={opt.optionId}
            aria-label={opt.label}
            className="cursor-pointer size-4 flex items-center justify-center p-0"
            onPress={() => {
              onSelect(
                opt.optionId,
                opt.optionCode,
                opt.image,
                opt.attributeCode,
              );
            }}
          >
            {({ isHovered }) => (
              <span
                className={cn(
                  'relative inline-flex items-center justify-center size-4 rounded-full transition-all duration-150',
                  hasImage && 'bg-cover bg-center',
                  hasImage &&
                    isSelected &&
                    'ring-2 ring-inset ring-white shadow-[0_0_0_2px_#222]',
                  hasImage &&
                    isHovered &&
                    !isSelected &&
                    'ring-1 ring-slate-400',
                  !hasImage && needsBorder && 'border border-slate-300',
                )}
                style={circleStyle}
              >
                {!hasImage && (isSelected || isHovered) && (
                  <CheckIcon
                    className={cn(
                      'w-2.5 h-2.5 transition-opacity duration-150',
                      needsBorder
                        ? 'text-slate-400'
                        : 'text-white drop-shadow-sm',
                      isHovered && !isSelected && 'opacity-70',
                    )}
                  />
                )}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}
