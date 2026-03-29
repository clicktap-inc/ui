'use client';

export function EmptyResults({
  searchQuery,
  hasFilters,
  onClearFilters,
  onClearSearch,
}: {
  searchQuery?: string;
  hasFilters: boolean;
  onClearFilters?: () => void;
  onClearSearch?: () => void;
}) {
  const hasActions =
    (hasFilters && onClearFilters) || (searchQuery && onClearSearch);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center col-span-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-slate-300 mb-4"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        No results found
      </h3>
      {searchQuery && (
        <p className="text-sm text-slate-500 mb-4">
          We couldn&apos;t find anything matching &ldquo;{searchQuery}&rdquo;
        </p>
      )}
      {!searchQuery && !hasFilters && (
        <p className="text-sm text-slate-500 mb-4">
          No products match your current selection.
        </p>
      )}
      {hasActions && (
        <div className="flex items-center gap-3">
          {searchQuery && onClearSearch && (
            <button
              type="button"
              onClick={onClearSearch}
              className="text-sm font-medium text-slate-700 hover:text-slate-900 underline underline-offset-2 transition-colors"
            >
              Clear search
            </button>
          )}
          {hasFilters && onClearFilters && searchQuery && onClearSearch && (
            <span className="text-slate-300">|</span>
          )}
          {hasFilters && onClearFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-sm font-medium text-slate-700 hover:text-slate-900 underline underline-offset-2 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
      {!hasActions && (
        <p className="text-xs text-slate-400">
          Try a different search term or browse our categories.
        </p>
      )}
    </div>
  );
}
