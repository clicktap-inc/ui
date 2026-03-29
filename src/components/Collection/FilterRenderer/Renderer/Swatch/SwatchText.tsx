'use client';

import { Checkbox } from '../../../../Checkbox';
import { cn } from '../../../../../utils/cn';
import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAppliedOption,
  CollectionFilterAvailableOption,
} from '../../../../../types/collection';
import { useOptionFilterToggle } from '../useOptionFilterToggle';

type SwatchTextProps = {
  filter: CollectionFilterAppliedOption | CollectionFilterAvailableOption;
  onFilterChange: (filters: CollectionFilterAppliedInterface[]) => void;
  appliedFilters: CollectionFilterAppliedInterface[];
  variant?: 'drawer' | 'sidebar';
};

export function SwatchText({
  filter,
  onFilterChange,
  appliedFilters,
  variant = 'drawer',
}: SwatchTextProps) {
  const { handleOptionToggle, getOptionIsChecked } = useOptionFilterToggle({
    filter,
    onFilterChange,
    appliedFilters,
  });

  const options = filter.options.map((option) => {
    const isChecked = getOptionIsChecked(option.code);
    const textValue = option.swatch?.text ?? option.label;

    return (
      <div key={`${filter.code}-${option.code}`}>
        <Checkbox
          key={`swatch-${filter.code}-${option.code}-${String(isChecked)}`}
          isSelected={isChecked}
          className="cursor-pointer"
          onChange={(checked) => handleOptionToggle(option.code, checked)}
          slots={{
            control: ({ isSelected, isHovered }) => (
              <span
                className={cn(
                  'inline-flex items-center justify-center px-3.5 py-2 text-xs font-medium border shrink-0 transition-colors duration-150',
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-300',
                  isHovered && !isSelected && 'border-slate-500',
                )}
              >
                {textValue}
              </span>
            ),
          }}
        />
      </div>
    );
  });

  if (variant === 'sidebar') {
    return <div className="flex flex-wrap gap-2 pb-2">{options}</div>;
  }

  return (
    <div className="border border-slate-200 rounded-lg p-4">
      <h4 className="font-medium mb-3">{filter.label}</h4>
      <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
        {options}
      </div>
    </div>
  );
}
