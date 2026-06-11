// Root barrel for `@clicktap/ui`.
//
// Consumed only via the `@clicktap/ui` tsconfig path alias (e.g. apps/ui-docs maps
// `@clicktap/ui` -> `libs/ui/src/index.ts`). The published package itself exposes only
// subpath exports (`@clicktap/ui/components/*`, `@clicktap/ui/hooks/*`, …) — there is no
// `.` entry in package.json `exports`, and this file is intentionally excluded from the
// library build (see vite.config.ts). App code that bundles the package directly (e.g.
// apps/frontend) should keep importing the subpaths, not this barrel.
//
// Add a re-export here when a `@clicktap/ui`-root consumer (ui-docs) needs another
// component.

export * from './components/Avatar';
export * from './components/Badge';
export * from './components/Button';
export * from './components/Divider';
export * from './components/Link';
export * from './components/Meter';
export * from './components/Switch';
export * from './components/Time';
export * from './components/TimeInput';
export * from './components/Timezone';
export * from './components/ToggleButton';
export * from './components/Tooltip';
