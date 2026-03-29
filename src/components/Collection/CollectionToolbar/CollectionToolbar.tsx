'use client';

import { DropdownSelect } from '../../Select';
import { Option } from '../../Select';
import { Button } from '../../Button';
import { FilterIcon } from '../../Icon/FilterIcon';
import type { SortOrder } from '../../../types/collection';

type CollectionToolbarProps = {
  totalItems: number;
  startItem: number;
  endItem: number;
  setShowMobileFilters: (show: boolean) => void;
  availableSortOrders: SortOrder[];
  appliedSortOrder?: SortOrder;
  onSortChange: (key: React.Key | null) => void;
};

export function CollectionToolbar({
  totalItems,
  startItem,
  endItem,
  setShowMobileFilters,
  availableSortOrders,
  appliedSortOrder,
  onSortChange,
}: CollectionToolbarProps) {
  const allSortOrders = [
    ...(appliedSortOrder ? [appliedSortOrder] : []),
    ...availableSortOrders,
  ];

  return (
    <div className="flex flex-col gap-y-5 mb-3">
      <div className="flex items-center justify-between lg:justify-end gap-x-2">
        <Button
          className="lg:hidden grow-0 shrink-0 basis-auto gap-x-3 px-4"
          size="sm"
          variant="outline"
          onPress={() => setShowMobileFilters(true)}
          aria-details="show filters"
        >
          <FilterIcon className="w-3 h-3" />
          Filters
        </Button>
        <DropdownSelect
          selectedKey={
            appliedSortOrder
              ? `${appliedSortOrder.code}_${appliedSortOrder.direction}`
              : null
          }
          onSelectionChange={onSortChange}
          placeholder="Sort by"
          label="Sort By:"
          classNames={{
            trigger: 'text-xs w-44 h-8 min-h-0',
            value: 'text-xs',
            label: 'hidden lg:block text-xs text-gray-600 whitespace-nowrap',
          }}
        >
          {allSortOrders.map((sort) => (
            <Option
              key={`${sort.code}_${sort.direction}`}
              id={`${sort.code}_${sort.direction}`}
              textValue={sort.label}
            >
              {sort.label}
            </Option>
          ))}
        </DropdownSelect>
      </div>
      {totalItems > 0 && (
        <p className="text-sm text-slate-500">
          Displaying {startItem} - {endItem} of {totalItems} items
        </p>
      )}
    </div>
  );
}
