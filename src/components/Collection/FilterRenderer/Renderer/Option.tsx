'use client';

import { Checkbox } from '../../../Checkbox';
import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAppliedOption,
  CollectionFilterAvailableOption,
} from '../../../../types/collection';
import { useOptionFilterToggle } from './useOptionFilterToggle';

type FilterRendererOptionProps = {
  filter: CollectionFilterAppliedOption | CollectionFilterAvailableOption;
  onFilterChange: (filters: CollectionFilterAppliedInterface[]) => void;
  appliedFilters: CollectionFilterAppliedInterface[];
  variant?: 'drawer' | 'sidebar';
};

export function FilterRendererOption({
  filter,
  onFilterChange,
  appliedFilters,
  variant = 'drawer',
}: FilterRendererOptionProps) {
  const { handleOptionToggle, getOptionIsChecked } = useOptionFilterToggle({
    filter,
    onFilterChange,
    appliedFilters,
  });

  const options = filter.options.map((option) => {
    const isChecked = getOptionIsChecked(option.code);
    const itemCount = 'itemCount' in option ? option.itemCount : null;

    return (
      <div key={`${filter.code}-${option.code}`} className="flex items-center">
        <Checkbox
          key={`checkbox-${filter.code}-${option.code}-${String(isChecked)}`}
          isSelected={isChecked}
          onChange={(checked) => handleOptionToggle(option.code, checked)}
          className="cursor-pointer"
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
    return <div className="space-y-2 pb-2">{options}</div>;
  }

  return (
    <div className="border border-slate-200 rounded-lg p-4">
      <h4 className="font-medium mb-3">{filter.label}</h4>
      <div className="space-y-2 max-h-60 overflow-y-auto">{options}</div>
    </div>
  );
}

export default FilterRendererOption;
