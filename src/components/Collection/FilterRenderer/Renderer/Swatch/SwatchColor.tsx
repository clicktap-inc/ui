'use client';

import { Checkbox } from '../../../../Checkbox';
import { CheckIcon } from '../../../../Icon/CheckIcon';
import { cn } from '../../../../../utils/cn';
import { isDevelopment } from '../../../../../utils/env';
import { isVeryLight, isValidHex } from '../../../../../utils/color';
import { isValidImageUrl } from '../../../../../utils/swatch';
import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAppliedOption,
  CollectionFilterAvailableOption,
} from '../../../../../types/collection';
import { useOptionFilterToggle } from '../useOptionFilterToggle';

type SwatchColorProps = {
  filter: CollectionFilterAppliedOption | CollectionFilterAvailableOption;
  onFilterChange: (filters: CollectionFilterAppliedInterface[]) => void;
  appliedFilters: CollectionFilterAppliedInterface[];
  variant?: 'drawer' | 'sidebar';
};

export function SwatchColor({
  filter,
  onFilterChange,
  appliedFilters,
  variant = 'drawer',
}: SwatchColorProps) {
  const { handleOptionToggle, getOptionIsChecked } = useOptionFilterToggle({
    filter,
    onFilterChange,
    appliedFilters,
  });

  const options = filter.options.map((option) => {
    const isChecked = getOptionIsChecked(option.code);
    const itemCount = 'itemCount' in option ? option.itemCount : null;
    const imageUrl = option.swatch?.imageUrl ?? null;
    const hexValue = option.swatch?.hex ?? null;
    const hasImage = isValidImageUrl(imageUrl);
    const hasHex = isValidHex(hexValue);

    // No swatch data — fall back to plain checkbox
    if (!hasImage && !hasHex) {
      if (isDevelopment) {
        if (imageUrl && !hasImage) {
          console.warn(
            `[Swatch] Invalid imageUrl "${imageUrl}" on option "${option.code}" for attribute "${filter.code}"`,
          );
        }
        if (hexValue && !hasHex) {
          console.warn(
            `[Swatch] Invalid hex "${hexValue}" on option "${option.code}" for attribute "${filter.code}"`,
          );
        }
        if (!imageUrl && !hexValue) {
          console.warn(
            `[Swatch] Missing hex and imageUrl on option "${option.code}" for attribute "${filter.code}"`,
          );
        }
      }
      return (
        <div
          key={`${filter.code}-${option.code}`}
          className="flex items-center"
        >
          <Checkbox
            key={`swatch-${filter.code}-${option.code}-${String(isChecked)}`}
            isSelected={isChecked}
            className="cursor-pointer"
            onChange={(checked) => handleOptionToggle(option.code, checked)}
          >
            <span className="text-sm">{option.label}</span>
          </Checkbox>
        </div>
      );
    }

    if (isDevelopment && imageUrl && !hasImage) {
      console.warn(
        `[Swatch] Falling back to SWATCH (hex) renderer for attribute "${filter.code}" option "${option.code}" — invalid imageUrl "${imageUrl}"`,
      );
    }
    const needsBorder = hasImage ? false : isVeryLight(hexValue);
    const circleStyle = hasImage
      ? { backgroundImage: `url(${imageUrl})` }
      : { backgroundColor: hexValue ?? undefined };

    return (
      <div key={`${filter.code}-${option.code}`} className="flex items-center">
        <Checkbox
          key={`swatch-${filter.code}-${option.code}-${String(isChecked)}`}
          isSelected={isChecked}
          className="cursor-pointer"
          onChange={(checked) => handleOptionToggle(option.code, checked)}
          slots={{
            control: ({ isSelected, isHovered }) => (
              <span
                className={cn(
                  'relative inline-flex items-center justify-center size-[22px] rounded-full shrink-0 transition-all duration-150',
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
                      'w-3 h-3 transition-opacity duration-150',
                      needsBorder
                        ? 'text-slate-400'
                        : 'text-white drop-shadow-sm',
                      isHovered && !isSelected && 'opacity-70',
                    )}
                  />
                )}
              </span>
            ),
          }}
        >
          {({ isHovered }) => (
            <span
              className="text-sm transition-colors duration-150"
              style={{ color: isHovered ? '#777777' : '#303133' }}
            >
              {option.label}
              {itemCount !== null && itemCount !== undefined && (
                <span
                  className="ml-1 transition-opacity duration-150"
                  style={{
                    color: '#777777',
                    opacity: isHovered ? 0.7 : 1,
                  }}
                >
                  ({itemCount})
                </span>
              )}
            </span>
          )}
        </Checkbox>
      </div>
    );
  });

  if (variant === 'sidebar') {
    return (
      <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 px-0.5 pb-2">
        {options}
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-lg p-4">
      <h4 className="font-medium mb-3">{filter.label}</h4>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2.5 max-h-60 overflow-y-auto">
        {options}
      </div>
    </div>
  );
}
