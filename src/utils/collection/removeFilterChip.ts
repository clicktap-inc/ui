import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAppliedOption,
  FilterChip,
} from '../../types/collection';

export function removeFilterChip(
  appliedFilters: CollectionFilterAppliedInterface[],
  chip: FilterChip,
): CollectionFilterAppliedInterface[] {
  if (chip.optionId) {
    return appliedFilters
      .map((f) => {
        if (f.code !== chip.filterCode) return f;
        const optionFilter = f as CollectionFilterAppliedOption;
        if (!('options' in optionFilter)) return f;
        const remaining = optionFilter.options.filter(
          (o) => o.code !== chip.optionId,
        );
        if (remaining.length === 0) return null;
        return { ...optionFilter, options: remaining };
      })
      .filter(Boolean) as CollectionFilterAppliedInterface[];
  }

  return appliedFilters.filter((f) => f.code !== chip.filterCode);
}
