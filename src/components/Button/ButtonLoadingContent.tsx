'use client';

import type { ReactNode } from 'react';
import { CircularEasing } from '../Loader/CircularEasing';

// Shared submit-button content layout: an invisible spacer on the
// left, the label in the middle, and a CircularEasing spinner on the
// right that fades in (opacity 0 ↔ 100) while `isLoading` is true.
// The spacer matches the spinner's width so the label stays visually
// centered in both states without a layout shift when the spinner
// toggles. Pattern lifted from the Place Order button.
//
// Stroke defaults to white for solid (dark) buttons; pass `#0f172a`
// (or any consumer-side color) for outline / ghost buttons.
export function ButtonLoadingContent({
  isLoading = false,
  spinnerStroke = '#FFFFFF',
  children,
}: {
  isLoading?: boolean;
  spinnerStroke?: string;
  children: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="w-5" aria-hidden="true" />
      {children}
      <span className={isLoading ? 'opacity-100' : 'opacity-0'}>
        <CircularEasing stroke={spinnerStroke} width={20} />
      </span>
    </span>
  );
}

export default ButtonLoadingContent;
