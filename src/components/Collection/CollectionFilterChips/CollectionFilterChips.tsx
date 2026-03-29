'use client';

import { useMemo } from 'react';
import { Button } from '../../Button';
import type { CollectionFilterAppliedInterface } from '../../../types/collection';
import { CrossSmall } from '../../Icon/CrossSmall';
import { getAppliedFilterChips } from '../../../utils/collection/getAppliedFilterChips';
import { removeFilterChip } from '../../../utils/collection/removeFilterChip';

type CollectionFilterChipsProps = {
  appliedFilters: CollectionFilterAppliedInterface[];
  onFilterChange: (filters: CollectionFilterAppliedInterface[]) => void;
};

export function CollectionFilterChips({
  appliedFilters,
  onFilterChange,
}: CollectionFilterChipsProps) {
  const chips = useMemo(
    () => getAppliedFilterChips(appliedFilters),
    [appliedFilters],
  );

  if (chips.length === 0) return null;

  return (
    <div className="pt-6 mt-5 border-t border-solid border-gray-100">
      <div className="flex gap-3 flex-wrap mb-3">
        {chips.map((chip) => (
          <Button
            variant="outline"
            className="px-2 py-1 h-6 font-medium text-xs flex items-center gap-x-1 rounded-md"
            onPress={() =>
              onFilterChange(removeFilterChip(appliedFilters, chip))
            }
            key={`${chip.filterCode}-${chip.optionId ?? 'bool'}`}
          >
            {chip.label}
            <CrossSmall />
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        className="px-2 py-1 h-6 font-bold text-xs text-red-500"
        onPress={() => onFilterChange([])}
      >
        Clear All
      </Button>
    </div>
  );
}
