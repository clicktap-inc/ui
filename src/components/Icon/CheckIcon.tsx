import type { SVGProps } from 'react';

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="3 8.5 6.5 12 13 4" />
    </svg>
  );
}

export default CheckIcon;
