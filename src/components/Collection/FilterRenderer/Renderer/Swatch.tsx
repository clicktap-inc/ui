'use client';

import { SwatchRenderer } from '../../../../utils/swatch';
import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAppliedOption,
  CollectionFilterAvailableOption,
} from '../../../../types/collection';
import { SwatchColor } from './Swatch/SwatchColor';
import { SwatchImage } from './Swatch/SwatchImage';
import { SwatchText } from './Swatch/SwatchText';

type FilterRendererSwatchProps = {
  filter: CollectionFilterAppliedOption | CollectionFilterAvailableOption;
  onFilterChange: (filters: CollectionFilterAppliedInterface[]) => void;
  appliedFilters: CollectionFilterAppliedInterface[];
  variant?: 'drawer' | 'sidebar';
};

export function FilterRendererSwatch(props: FilterRendererSwatchProps) {
  switch (props.filter.renderer) {
    case SwatchRenderer.IMAGE:
      return <SwatchImage {...props} />;
    case SwatchRenderer.TEXT:
      return <SwatchText {...props} />;
    default:
      return <SwatchColor {...props} />;
  }
}

export default FilterRendererSwatch;
