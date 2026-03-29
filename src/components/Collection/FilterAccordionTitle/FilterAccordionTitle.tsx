'use client';

import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAvailableInterface,
} from '../../../types/collection';
import { CrossSmall } from '../../Icon/CrossSmall';

type FilterAccordionTitleProps = {
  filter: CollectionFilterAppliedInterface | CollectionFilterAvailableInterface;
  appliedFilters: CollectionFilterAppliedInterface[];
  onFilterChange: (filters: CollectionFilterAppliedInterface[]) => void;
};

export function FilterAccordionTitle({
  filter,
  appliedFilters,
  onFilterChange,
}: FilterAccordionTitleProps) {
  const isApplied = appliedFilters.some((f) => f.code === filter.code);

  const handleClear = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    onFilterChange(appliedFilters.filter((f) => f.code !== filter.code));
  };

  return (
    <span className="flex items-center gap-2 w-full">
      {filter.label}
      {isApplied && (
        <span
          role="button"
          tabIndex={0}
          onClick={handleClear}
          onPointerDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClear(e);
            }
          }}
          aria-label={`Clear ${filter.label} filter`}
          className="p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <CrossSmall />
        </span>
      )}
    </span>
  );
}
