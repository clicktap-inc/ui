import {
  CollectionFilterCondition,
  type CollectionFilterAppliedInterface,
} from '../../types/collection';

type FilterGroup = {
  filters: Array<{
    field: string;
    condition: CollectionFilterCondition;
    value?: string;
    values?: string[];
  }>;
};

export function buildFilterGroups(
  categoryId: string | undefined,
  appliedFilters: CollectionFilterAppliedInterface[],
): FilterGroup[] {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const filters: FilterGroup['filters'] = [];

  if (categoryId) {
    filters.push({
      field: 'categoryId',
      condition: CollectionFilterCondition.Eq,
      value: categoryId,
    });
  }

  for (const filter of appliedFilters) {
    const typename = '__typename' in filter ? filter.__typename : undefined;

    if (typename === 'CollectionFilterAppliedOption' && 'options' in filter) {
      const optionFilter = filter as any;
      const appliedOptions = optionFilter.options.filter(
        (o: any) => o.isApplied,
      );
      if (appliedOptions.length > 0) {
        filters.push({
          field: filter.code,
          condition: CollectionFilterCondition.In,
          values: appliedOptions.map((o: any) => o.code),
        });
      }
    } else if (
      typename === 'CollectionFilterAppliedBoolean' &&
      'appliedValue' in filter
    ) {
      const boolFilter = filter as any;
      filters.push({
        field: filter.code,
        condition: CollectionFilterCondition.Eq,
        value: boolFilter.appliedValue ? 'true' : 'false',
      });
    }
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */

  return [{ filters }];
}
