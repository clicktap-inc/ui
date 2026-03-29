'use client';

import { useState, useCallback, useMemo } from 'react';
import type { CollectionFilterAppliedInterface } from '../../types/collection';
import {
  filtersToSearchParams,
  searchParamsToFilters,
} from '../../utils/collection/filterSearchParams';

type SwatchSelection = {
  optionId: string;
  optionCode: string;
  image: string | null;
  attributeCode: string;
};

type CollectionData = {
  collection?: {
    filters: {
      available: CollectionFilterAppliedInterface[];
      applied: CollectionFilterAppliedInterface[];
    };
    sortOrders: {
      available: Array<{ code: string; direction: string; label: string }>;
      applied?: Array<{ code: string; direction: string; label: string }>;
    };
    pagination?: {
      totalItemCount?: number;
      currentPage?: number;
      pageSize?: number;
      currentPageItemCount?: number;
    };
    items?: Array<{
      id: string;
      name: string;
      image?: string | null;
      canonicalUrl: string;
      type: { code: string };
      [key: string]: unknown;
    }>;
  } | null;
} | null;

type FetchParams = {
  appliedFilters: CollectionFilterAppliedInterface[];
  sort?: { field: string; direction: string }[];
  search?: string;
};

export type UseCollectionStateProps = {
  initialData: CollectionData;
  searchQuery?: string;
  onFetch: (params: FetchParams) => Promise<CollectionData | null>;
  onUrlUpdate: (url: string) => void;
};

export function useCollectionState({
  initialData,
  searchQuery = '',
  onFetch,
  onUrlUpdate,
}: UseCollectionStateProps) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [hidingIds, setHidingIds] = useState<Set<string>>(new Set());
  const [selectedSwatches, setSelectedSwatches] = useState<
    Record<string, SwatchSelection>
  >({});

  const availableFilters = useMemo(
    () => data?.collection?.filters.available ?? [],
    [data?.collection?.filters.available],
  );
  const appliedFilters = useMemo(
    () => data?.collection?.filters.applied ?? [],
    [data?.collection?.filters.applied],
  );
  const allFilters = useMemo(
    () => [...availableFilters, ...appliedFilters],
    [availableFilters, appliedFilters],
  );
  const availableSortOrders = data?.collection?.sortOrders.available ?? [];
  const appliedSortOrder = data?.collection?.sortOrders.applied?.[0];
  const pagination = data?.collection?.pagination;
  const totalItems = pagination?.totalItemCount ?? 0;
  const currentPage = pagination?.currentPage ?? 1;
  const pageSize = pagination?.pageSize ?? 20;
  const currentPageItemCount = pagination?.currentPageItemCount ?? 0;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = (currentPage - 1) * pageSize + currentPageItemCount;
  const items = data?.collection?.items ?? [];

  const getDisplayImage = useCallback(
    (
      product: {
        id: string;
        image?: string | null;
        matchedVariants?: { image?: string | null }[];
      },
      variants: { simpleProduct: { image?: string | null } }[],
    ) => {
      const swatchImage = selectedSwatches[product.id]?.image;
      if (swatchImage) {
        return String(swatchImage);
      }
      const matched = product.matchedVariants?.[0]?.image;
      if (matched) {
        return String(matched);
      }
      const firstVariantImage = variants[0]?.simpleProduct?.image;
      if (firstVariantImage) {
        return String(firstVariantImage);
      }
      return String(product.image ?? '');
    },
    [selectedSwatches],
  );

  const hideThenApply = useCallback(
    async (newData: NonNullable<CollectionData>) => {
      const oldItems = data?.collection?.items ?? [];
      const newItems = newData?.collection?.items ?? [];

      const changedIds = new Set<string>();
      for (const newItem of newItems) {
        const oldItem = oldItems.find((o) => o.id === newItem.id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newVariants = (newItem as any).variants ?? [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const oldVariants = oldItem ? ((oldItem as any).variants ?? []) : [];
        if (
          oldItem &&
          getDisplayImage(newItem, newVariants) !==
            getDisplayImage(oldItem, oldVariants)
        ) {
          changedIds.add(newItem.id);
        }
      }

      if (changedIds.size > 0) {
        setHidingIds(changedIds);
        await new Promise((r) => setTimeout(r, 220));
      }

      setData(newData);
      setIsLoading(false);
    },
    [data, getDisplayImage],
  );

  const mergeFilterParams = useCallback(
    (filters: CollectionFilterAppliedInterface[]): URLSearchParams => {
      const currentParams = new URLSearchParams(window.location.search);
      const newParams = filtersToSearchParams(filters);

      const merged = new URLSearchParams();
      for (const [key, newValue] of newParams.entries()) {
        const existing = currentParams.get(key);
        if (existing) {
          const existingIds = existing.split(',');
          const newIds = newValue.split(',');
          const added = newIds.filter((id) => !existingIds.includes(id));
          const kept = existingIds.filter((id) => newIds.includes(id));
          merged.set(key, [...kept, ...added].join(','));
        } else {
          merged.set(key, newValue);
        }
      }

      return merged;
    },
    [],
  );

  const handleSortChange = useCallback(
    async (key: React.Key | null) => {
      if (!key) return;

      setIsLoading(true);
      const sortValue = String(key);
      const [sortCode, direction] = sortValue.split('_');

      try {
        const response = await onFetch({
          appliedFilters,
          sort: [{ field: sortCode, direction }],
          search: searchQuery || undefined,
        });
        if (response) {
          await hideThenApply(response);
          return;
        }
      } catch (error) {
        console.error('Error fetching sorted products:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [appliedFilters, searchQuery, onFetch, hideThenApply],
  );

  const handleFilterChange = useCallback(
    async (newAppliedFilters: CollectionFilterAppliedInterface[]) => {
      setIsLoading(true);

      const mergedParams = mergeFilterParams(newAppliedFilters);
      if (searchQuery) {
        mergedParams.set('q', searchQuery);
      }
      const qs = mergedParams.toString().split('%2C').join(',');
      const url = qs
        ? `${window.location.pathname}?${qs}`
        : window.location.pathname;
      onUrlUpdate(url);

      mergedParams.delete('q');
      const orderedFilters = searchParamsToFilters(
        Object.fromEntries(mergedParams.entries()),
      );

      try {
        const response = await onFetch({
          appliedFilters: orderedFilters,
          search: searchQuery || undefined,
        });
        if (response) {
          setData(response);
        }
      } catch (error) {
        console.error('Error fetching filtered products:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery, mergeFilterParams, onFetch, onUrlUpdate],
  );

  const selectSwatch = useCallback(
    (
      productId: string,
      optionId: string,
      optionCode: string,
      image: string | null,
      attributeCode: string,
    ) => {
      setSelectedSwatches((prev) => ({
        ...prev,
        [productId]: { optionId, optionCode, image, attributeCode },
      }));
    },
    [],
  );

  const clearHidingId = useCallback((id: string) => {
    setHidingIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  return {
    data,
    isLoading,
    showMobileFilters,
    setShowMobileFilters,
    hidingIds,
    selectedSwatches,
    availableFilters,
    appliedFilters,
    allFilters,
    availableSortOrders,
    appliedSortOrder,
    totalItems,
    startItem,
    endItem,
    items,
    getDisplayImage,
    handleSortChange,
    handleFilterChange,
    selectSwatch,
    clearHidingId,
  };
}
