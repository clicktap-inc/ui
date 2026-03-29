'use client';

import { Button } from 'react-aria-components';
import { cn } from '../../../../../utils/cn';
import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAppliedOption,
  CollectionFilterAvailableOption,
} from '../../../../../types/collection';
import { useOptionFilterToggle } from '../useOptionFilterToggle';

type SwatchImageProps = {
  filter: CollectionFilterAppliedOption | CollectionFilterAvailableOption;
  onFilterChange: (filters: CollectionFilterAppliedInterface[]) => void;
  appliedFilters: CollectionFilterAppliedInterface[];
  variant?: 'drawer' | 'sidebar';
};

export function SwatchImage({
  filter,
  onFilterChange,
  appliedFilters,
  variant = 'drawer',
}: SwatchImageProps) {
  const { handleOptionToggle, getOptionIsChecked } = useOptionFilterToggle({
    filter,
    onFilterChange,
    appliedFilters,
  });

  const options = filter.options.map((option) => {
    const isChecked = getOptionIsChecked(option.code);
    const imageUrl = option.swatch?.imageUrl ?? null;

    return (
      <Button
        key={`${filter.code}-${option.code}`}
        aria-label={option.label}
        aria-pressed={isChecked}
        className="cursor-pointer p-0"
        onPress={() => handleOptionToggle(option.code, !isChecked)}
      >
        {({ isHovered }) => (
          <span
            className={cn(
              'block w-full aspect-[2.2/1] border bg-contain bg-center bg-no-repeat transition-all duration-150',
              isChecked
                ? 'border-slate-900 ring-1 ring-slate-900'
                : 'border-slate-200',
              isHovered && !isChecked && 'border-slate-400',
              !imageUrl &&
                'flex items-center justify-center text-xs text-slate-500',
            )}
            title={option.label}
            style={
              imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined
            }
          >
            {!imageUrl && option.label}
          </span>
        )}
      </Button>
    );
  });

  if (variant === 'sidebar') {
    return <div className="grid grid-cols-3 gap-2 pb-2">{options}</div>;
  }

  return (
    <div className="border border-slate-200 rounded-lg p-4">
      <h4 className="font-medium mb-3">{filter.label}</h4>
      <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
        {options}
      </div>
    </div>
  );
}
