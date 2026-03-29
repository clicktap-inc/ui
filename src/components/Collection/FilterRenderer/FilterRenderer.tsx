'use client';

import type { ReactNode } from 'react';
import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAvailableInterface,
} from '../../../types/collection';
import type {
  CollectionFilterApplied,
  CollectionFilterAvailable,
} from './types';
import { isDevelopment } from '../../../utils/env';
import { isSwatchRenderer } from '../../../utils/swatch';
import { FilterRendererOption } from './Renderer/Option';
import { FilterRendererSwatch } from './Renderer/Swatch';
import { FilterRendererBoolean } from './Renderer/Boolean';
import { FilterRendererRange } from './Renderer/Range';

type FilterRendererProps = {
  filter: CollectionFilterAppliedInterface | CollectionFilterAvailableInterface;
  onFilterChange: (filters: CollectionFilterAppliedInterface[]) => void;
  appliedFilters: CollectionFilterAppliedInterface[];
  variant?: 'drawer' | 'sidebar';
};

export function FilterRenderer({
  filter,
  onFilterChange,
  appliedFilters,
  variant = 'drawer',
}: FilterRendererProps): ReactNode {
  const typed = filter as CollectionFilterApplied | CollectionFilterAvailable;

  switch (typed.__typename) {
    case 'CollectionFilterAppliedOption':
    case 'CollectionFilterAvailableOption': {
      const optionFilter = typed as Parameters<
        typeof FilterRendererOption
      >[0]['filter'];
      if (isSwatchRenderer(optionFilter.renderer)) {
        return (
          <FilterRendererSwatch
            filter={optionFilter}
            onFilterChange={onFilterChange}
            appliedFilters={appliedFilters}
            variant={variant}
          />
        );
      }
      if (
        isDevelopment &&
        optionFilter.renderer !== null &&
        optionFilter.renderer !== undefined
      ) {
        console.warn(
          `[Swatch] Unknown filterRenderer "${optionFilter.renderer}" for attribute "${optionFilter.code}" — falling back to default option filter`,
        );
      }
      return (
        <FilterRendererOption
          filter={optionFilter}
          onFilterChange={onFilterChange}
          appliedFilters={appliedFilters}
          variant={variant}
        />
      );
    }
    case 'CollectionFilterAppliedBoolean':
    case 'CollectionFilterAvailableBoolean':
      return (
        <FilterRendererBoolean
          filter={
            typed as Parameters<typeof FilterRendererBoolean>[0]['filter']
          }
          onFilterChange={onFilterChange}
          appliedFilters={appliedFilters}
          variant={variant}
        />
      );
    case 'CollectionFilterAppliedRange':
    case 'CollectionFilterAvailableRange':
      return (
        <FilterRendererRange
          filter={typed as Parameters<typeof FilterRendererRange>[0]['filter']}
        />
      );
    default:
      return null;
  }
}
