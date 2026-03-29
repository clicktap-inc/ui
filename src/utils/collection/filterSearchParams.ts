import type { CollectionFilterAppliedInterface } from '../../types/collection';

/**
 * Serialize applied filters to URL search params.
 * Option filters: ?color=code1,code2&size=code3
 * Boolean filters: ?is_new=true
 */
export function filtersToSearchParams(
  appliedFilters: CollectionFilterAppliedInterface[],
): URLSearchParams {
  const params = new URLSearchParams();

  for (const filter of appliedFilters) {
    const typename = '__typename' in filter ? filter.__typename : undefined;

    if (typename === 'CollectionFilterAppliedOption' && 'options' in filter) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const optionFilter = filter as any;
      const appliedIds = optionFilter.options
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((o: any) => o.isApplied)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((o: any) => o.code);
      if (appliedIds.length > 0) {
        params.set(filter.code, appliedIds.join(','));
      }
    } else if (
      typename === 'CollectionFilterAppliedBoolean' &&
      'appliedValue' in filter
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const boolFilter = filter as any;
      params.set(filter.code, boolFilter.appliedValue ? 'true' : 'false');
    }
  }

  return params;
}

/**
 * Deserialize URL search params into a minimal applied filters structure.
 * Returns partial filter objects with code + options/value — enough for
 * buildFilterGroups to construct the GraphQL query.
 */
export function searchParamsToFilters(
  params: Record<string, string | string[] | undefined>,
): CollectionFilterAppliedInterface[] {
  const filters: CollectionFilterAppliedInterface[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (!value) continue;
    const strValue = Array.isArray(value) ? value[0] : value;
    if (!strValue) continue;

    if (strValue === 'true' || strValue === 'false') {
      filters.push({
        __typename: 'CollectionFilterAppliedBoolean',
        code: key,
        label: key,
        renderer: 'boolean',
        type: 'boolean',
        includeInFilters: true,
        appliedValue: strValue === 'true',
      } as CollectionFilterAppliedInterface);
    } else {
      const codes = strValue.split(',').filter(Boolean);
      if (codes.length > 0) {
        filters.push({
          __typename: 'CollectionFilterAppliedOption',
          code: key,
          label: key,
          renderer: 'option',
          type: 'option',
          includeInFilters: true,
          isSearchable: false,
          options: codes.map((code) => ({
            id: '',
            code,
            label: '',
            isApplied: true,
          })),
        } as CollectionFilterAppliedInterface);
      }
    }
  }

  return filters;
}
