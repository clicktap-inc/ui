import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAppliedOption,
  CollectionFilterAppliedBoolean,
  FilterChip,
} from '../../types/collection';

export function getAppliedFilterChips(
  appliedFilters: CollectionFilterAppliedInterface[],
): FilterChip[] {
  const chips: FilterChip[] = [];

  for (const filter of appliedFilters) {
    const typename = '__typename' in filter ? filter.__typename : undefined;

    if (typename === 'CollectionFilterAppliedOption' && 'options' in filter) {
      const optionFilter = filter as CollectionFilterAppliedOption;
      for (const option of optionFilter.options) {
        if (option.isApplied) {
          chips.push({
            filterCode: filter.code,
            label: option.label,
            optionId: option.code,
          });
        }
      }
    } else if (
      typename === 'CollectionFilterAppliedBoolean' &&
      'appliedValue' in filter
    ) {
      const boolFilter = filter as CollectionFilterAppliedBoolean;
      chips.push({
        filterCode: filter.code,
        label: `${filter.label}: ${boolFilter.appliedValue ? boolFilter.trueLabel : boolFilter.falseLabel}`,
      });
    }
  }

  return chips;
}
