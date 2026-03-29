import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAppliedOption,
  CollectionFilterAvailableOption,
} from '../../../../types/collection';

type UseOptionFilterToggleProps = {
  filter: CollectionFilterAppliedOption | CollectionFilterAvailableOption;
  onFilterChange: (filters: CollectionFilterAppliedInterface[]) => void;
  appliedFilters: CollectionFilterAppliedInterface[];
};

export function useOptionFilterToggle({
  filter,
  onFilterChange,
  appliedFilters,
}: UseOptionFilterToggleProps) {
  const handleOptionToggle = (optionCode: string, checked: boolean) => {
    const existingFilter = appliedFilters.find(
      (f) => f.code === filter.code,
    ) as CollectionFilterAppliedOption | undefined;

    if (checked) {
      const sourceOption = filter.options.find((o) => o.code === optionCode);
      if (existingFilter) {
        const updatedFilter = {
          ...existingFilter,
          options: [
            ...existingFilter.options,
            {
              id: sourceOption?.id || '',
              code: optionCode,
              label: sourceOption?.label || '',
              isApplied: true,
            },
          ],
        };
        onFilterChange([
          ...appliedFilters.filter((f) => f.code !== filter.code),
          updatedFilter,
        ]);
      } else {
        const newFilter = {
          __typename: 'CollectionFilterAppliedOption' as const,
          code: filter.code,
          label: filter.label,
          renderer: filter.renderer,
          type: filter.type,
          includeInFilters: filter.includeInFilters,
          isSearchable: filter.isSearchable,
          options: [
            {
              id: sourceOption?.id || '',
              code: optionCode,
              label: sourceOption?.label || '',
              isApplied: true,
            },
          ],
        };
        onFilterChange([
          ...appliedFilters,
          newFilter as CollectionFilterAppliedOption,
        ]);
      }
    } else if (existingFilter) {
      const updatedOptions = existingFilter.options.filter(
        (o) => o.code !== optionCode,
      );
      if (updatedOptions.length === 0) {
        onFilterChange(appliedFilters.filter((f) => f.code !== filter.code));
      } else {
        const updatedFilter = {
          ...existingFilter,
          options: updatedOptions,
        };
        onFilterChange([
          ...appliedFilters.filter((f) => f.code !== filter.code),
          updatedFilter,
        ]);
      }
    }
  };

  const getOptionIsChecked = (optionCode: string): boolean => {
    const existingFilter = appliedFilters.find(
      (f) => f.code === filter.code,
    ) as CollectionFilterAppliedOption | undefined;
    return (
      existingFilter?.options.some(
        (o) => o.code === optionCode && o.isApplied,
      ) || false
    );
  };

  return { handleOptionToggle, getOptionIsChecked };
}
