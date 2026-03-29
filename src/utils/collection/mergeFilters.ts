import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAvailableInterface,
} from '../../types/collection';

export function mergeFilters(
  appliedFilters: CollectionFilterAppliedInterface[],
  availableFilters: CollectionFilterAvailableInterface[],
): (CollectionFilterAppliedInterface | CollectionFilterAvailableInterface)[] {
  const appliedCodes = new Set(appliedFilters.map((f) => f.code));
  return [
    ...appliedFilters,
    ...availableFilters.filter((f) => !appliedCodes.has(f.code)),
  ];
}
