'use client';

import { useMemo, useState, Suspense, type KeyboardEventHandler } from 'react';
import { Accordion, AccordionItem } from '../../Accordion';
import { Button } from '../../Button';
import { ModalOverlay } from '../../ModalOverlay';
import { Modal } from '../../Modal';
import { Drawer } from '../../Drawer';
import { Cross } from '../../Icon/Cross';
import { CrossSmall } from '../../Icon/CrossSmall';
import { Search } from '../../Icon/Search';
import type {
  CollectionFilterAppliedInterface,
  CollectionFilterAvailableInterface,
} from '../../../types/collection';
import { FilterRenderer } from '../FilterRenderer/FilterRenderer';
import { mergeFilters } from '../../../utils/collection/mergeFilters';
import { FilterAccordionTitle } from '../FilterAccordionTitle/FilterAccordionTitle';
import { EmptyResults } from '../EmptyResults/EmptyResults';

type CollectionFiltersProps = {
  availableFilters: CollectionFilterAvailableInterface[];
  appliedFilters: CollectionFilterAppliedInterface[];
  onFilterChange: (filters: CollectionFilterAppliedInterface[]) => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (open: boolean) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  totalItems?: number;
};

function AccordionItemArrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FilterSearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (query: string) => void;
}) {
  const [localValue, setLocalValue] = useState(value);

  const submit = () => {
    onChange(localValue.trim());
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  };

  const clear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative">
      <input
        type="search"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={submit}
        placeholder="Search products..."
        aria-label="Search products"
        autoComplete="off"
        className="w-full h-9 pl-8 pr-8 rounded-md border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 [&::-webkit-search-cancel-button]:hidden"
      />
      {localValue && (
        <button
          type="button"
          onClick={clear}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          <CrossSmall />
        </button>
      )}
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 [&>svg]:w-full [&>svg]:h-full text-slate-400">
        <Search />
      </span>
    </div>
  );
}

export function CollectionFilters({
  availableFilters,
  appliedFilters,
  onFilterChange,
  showMobileFilters,
  setShowMobileFilters,
  searchQuery,
  onSearchChange,
  totalItems,
}: CollectionFiltersProps) {
  const allFilters = useMemo(
    () =>
      mergeFilters(appliedFilters, availableFilters).filter(
        (f) => f.includeInFilters !== false,
      ),
    [appliedFilters, availableFilters],
  );

  const searchInput = onSearchChange && (
    <FilterSearchInput
      key={searchQuery}
      value={searchQuery ?? ''}
      onChange={onSearchChange}
    />
  );

  const renderFilters = () =>
    allFilters.length > 0 && (
      <Accordion
        selectionMode="multiple"
        defaultSelectedKeys="all"
        className="pt-2 mt-3"
        showDivider={false}
        itemClasses={{
          base: 'py-1',
          title: 'text-sm font-medium leading-7',
          trigger: 'py-2 border-b border-gray-200',
          indicator: 'data-[open="true"]:rotate-180',
          content: 'pt-2 pb-3',
        }}
      >
        {allFilters.map((filter) => (
          <AccordionItem
            key={filter.code}
            textValue={filter.label}
            title={
              <FilterAccordionTitle
                filter={filter}
                appliedFilters={appliedFilters}
                onFilterChange={onFilterChange}
              />
            }
            disableIndicatorAnimation
            indicator={AccordionItemArrow}
          >
            <div className="pt-2">
              <FilterRenderer
                filter={filter}
                onFilterChange={onFilterChange}
                appliedFilters={appliedFilters}
                variant="sidebar"
              />
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    );

  return (
    <>
      <div className="hidden lg:flex lg:flex-col lg:basis-[16.5rem] lg:shrink-0">
        {searchInput}
        {renderFilters()}
        {appliedFilters.length > 0 && (
          <button
            type="button"
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors mt-4 mb-8"
            onClick={() => onFilterChange([])}
          >
            Clear all filters
          </button>
        )}
      </div>
      <div className="lg:hidden">
        <Suspense>
          <ModalOverlay
            isOpen={showMobileFilters}
            onOpenChange={(open) => setShowMobileFilters(open)}
            isDismissable
          >
            <Modal>
              <Drawer
                size="30rem"
                direction="left"
                aria-label="Filters"
                className="p-5"
              >
                {({ close }) => (
                  <div className="flex flex-col w-full h-full overflow-hidden">
                    <div className="flex items-center w-full justify-between">
                      <span className="text-xl font-bold text-slate-800">
                        Filters
                      </span>
                      <Button
                        variant="ghost"
                        aria-label="Close"
                        onPress={() => close()}
                        className="justify-start size-auto p-0"
                      >
                        <Cross />
                      </Button>
                    </div>
                    <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden">
                      {searchInput && <div className="mt-3">{searchInput}</div>}
                      {renderFilters()}
                      {totalItems === 0 && (
                        <EmptyResults
                          searchQuery={searchQuery}
                          hasFilters={appliedFilters.length > 0}
                          onClearFilters={() => onFilterChange([])}
                          onClearSearch={
                            searchQuery && onSearchChange
                              ? () => onSearchChange('')
                              : undefined
                          }
                        />
                      )}
                    </div>
                    <div className="shrink-0 pt-3 flex flex-col gap-3 border-t border-gray-200">
                      {appliedFilters.length > 0 && (
                        <button
                          type="button"
                          className="text-sm py-2 text-slate-500 hover:text-slate-700 transition-colors"
                          onClick={() => onFilterChange([])}
                        >
                          Clear all
                        </button>
                      )}
                      <Button
                        className="w-full py-6 text-base rounded-xl"
                        variant="primary"
                        onPress={() => close()}
                      >
                        View Results
                      </Button>
                    </div>
                  </div>
                )}
              </Drawer>
            </Modal>
          </ModalOverlay>
        </Suspense>
      </div>
    </>
  );
}
