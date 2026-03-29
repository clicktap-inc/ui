'use client';

import type {
  // TODO: Uncomment when range filter is implemented
  // CollectionFilterAppliedInterface,
  CollectionFilterAppliedRange,
  CollectionFilterAvailableRange,
} from '../../../../types/collection';

type FilterRendererRangeProps = {
  filter: CollectionFilterAppliedRange | CollectionFilterAvailableRange;
  // TODO: Uncomment when range filter is implemented
  // onFilterChange: (filters: CollectionFilterAppliedInterface[]) => void;
  // appliedFilters: CollectionFilterAppliedInterface[];
};

export function FilterRendererRange({ filter }: FilterRendererRangeProps) {
  // TODO: Implement range filter when backend provides min/max fields
  // This is a placeholder component that will be enhanced when the GraphQL schema
  // includes range-specific fields (min, max, step, etc.)

  return (
    <div className="border border-slate-200 rounded-lg p-4">
      <h4 className="font-medium mb-3">{filter.label}</h4>
      <div className="text-sm text-slate-500">Range filter coming soon</div>
    </div>
  );
}

export default FilterRendererRange;
