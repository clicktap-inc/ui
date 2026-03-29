import type {
  CollectionFilterAppliedOption,
  CollectionFilterAppliedBoolean,
  CollectionFilterAppliedRange,
  CollectionFilterAvailableOption,
  CollectionFilterAvailableBoolean,
  CollectionFilterAvailableRange,
  FilterChip,
} from '../../../types/collection';

export type { FilterChip };

export type CollectionFilterApplied =
  | CollectionFilterAppliedOption
  | CollectionFilterAppliedBoolean
  | CollectionFilterAppliedRange;

export type CollectionFilterAvailable =
  | CollectionFilterAvailableOption
  | CollectionFilterAvailableBoolean
  | CollectionFilterAvailableRange;
