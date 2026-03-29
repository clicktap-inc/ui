'use client';

import { RadioGroup } from '../../../RadioGroup';
import { Radio } from '../../../Radio';
import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAppliedBoolean,
  CollectionFilterAvailableBoolean,
} from '../../../../types/collection';

type FilterRendererBooleanProps = {
  filter: CollectionFilterAppliedBoolean | CollectionFilterAvailableBoolean;
  onFilterChange: (filters: CollectionFilterAppliedInterface[]) => void;
  appliedFilters: CollectionFilterAppliedInterface[];
  variant?: 'drawer' | 'sidebar';
};

export function FilterRendererBoolean({
  filter,
  onFilterChange,
  appliedFilters,
  variant = 'drawer',
}: FilterRendererBooleanProps) {
  const handleChange = (value: string) => {
    const boolValue = value === 'true';

    // Remove existing filter if "none" is selected
    if (value === 'none') {
      onFilterChange(appliedFilters.filter((f) => f.code !== filter.code));
      return;
    }

    // Create or update the applied filter
    const appliedFilter: CollectionFilterAppliedBoolean = {
      __typename: 'CollectionFilterAppliedBoolean',
      code: filter.code,
      label: filter.label,
      renderer: filter.renderer,
      type: filter.type,
      includeInFilters: filter.includeInFilters,
      trueLabel: filter.trueLabel,
      falseLabel: filter.falseLabel,
      appliedValue: boolValue,
    };

    onFilterChange([
      ...appliedFilters.filter((f) => f.code !== filter.code),
      appliedFilter,
    ]);
  };

  const getCurrentValue = (): string => {
    const existingFilter = appliedFilters.find(
      (f) => f.code === filter.code,
    ) as CollectionFilterAppliedBoolean | undefined;

    if (!existingFilter) return 'none';
    return existingFilter.appliedValue ? 'true' : 'false';
  };

  const trueItemCount =
    '__typename' in filter &&
    filter.__typename === 'CollectionFilterAvailableBoolean'
      ? filter.trueItemCount
      : null;
  const falseItemCount =
    '__typename' in filter &&
    filter.__typename === 'CollectionFilterAvailableBoolean'
      ? filter.falseItemCount
      : null;

  const radioContent = (
    <RadioGroup value={getCurrentValue()} onChange={handleChange}>
      <div className="space-y-2">
        <Radio value="none">
          <span className="text-sm">None</span>
        </Radio>
        <div className="flex items-center justify-between">
          <Radio value="true">
            <span className="text-sm">{filter.trueLabel}</span>
          </Radio>
          {trueItemCount !== null && trueItemCount !== undefined && (
            <span className="text-xs text-slate-500">({trueItemCount})</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Radio value="false">
            <span className="text-sm">{filter.falseLabel}</span>
          </Radio>
          {falseItemCount !== null && falseItemCount !== undefined && (
            <span className="text-xs text-slate-500">({falseItemCount})</span>
          )}
        </div>
      </div>
    </RadioGroup>
  );

  if (variant === 'sidebar') {
    return <div className="pb-2">{radioContent}</div>;
  }

  return (
    <div className="border border-slate-200 rounded-lg p-4">
      <h4 className="font-medium mb-3">{filter.label}</h4>
      {radioContent}
    </div>
  );
}

export default FilterRendererBoolean;
