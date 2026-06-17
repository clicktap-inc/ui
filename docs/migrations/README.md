# UI Library Migration Guides

Migration guides for the `@clicktap/ui` library. Each doc covers a specific change with before/after examples and checklists.

For migrations affecting the frontend app, see [frontend migrations](../../../../apps/frontend/docs/migrations/README.md).

## Index

| Date | Migration | Breaking | Dependencies |
|------|-----------|----------|--------------|
| 2026-01-14 | [External link detection + `LinkProvider`](./2026/01/2026-01-14-external-link-detection.md) | No | *None* |
| 2026-01-14 | [`useRoute` hook + `RouteProvider`](./2026/01/2026-01-14-use-route-hook.md) | No | *None* |
| 2026-01-15 | [`Input` `disableSkeleton` prop](./2026/01/2026-01-15-input-disable-skeleton.md) | No | *None* |
| 2026-02-16 | [Environment utilities — `@clicktap/ui/utils/env`](./2026/02/2026-02-16-env-utils-from-clicktap-ui.md) | No | *None* |
| 2026-02-17 | [`Select` `popoverPortalContainer` restored](./2026/02/2026-02-17-select-popover-portal-container-restored.md) | No | *None* |
| 2026-03-24 | [Image: dimmed, hidden, and onReady Props](./2026/03/2026-03-24-image-dimmed-hidden-onready.md) ↔ | No | *None* |
| 2026-03-24 | [ModalOverlay: fix dismiss on backdrop click](./2026/03/2026-03-24-modal-overlay-backdrop-dismiss.md) | No | *None* |
| 2026-04-17 | [`Select`/`AddressInput` `onChange` widened to `Key \| T`](./2026/04/2026-04-17-select-address-input-onchange-key-or-item.md) | Yes | *None* |
| 2026-04-24 | [`PLACEHOLDER_IMAGE` Export from `@clicktap/ui/utils/placeholder`](./2026/04/2026-04-24-image-placeholder-frontend-fallback.md) ↔ | No | *None* |
| 2026-04-30 | [Top-Down PDP Option Dependency — `@clicktap/ui/utils/variantOptions`](./2026/04/2026-04-30-top-down-pdp-option-dependency.md) ↔ | No | *None* |
| 2026-04-30 | [PDP Option Selection — Conservative Prune Helper (`pruneInvalidSelections`)](./2026/04/2026-04-30-prune-invalid-pdp-selections.md) ↔ | No | Top-Down PDP Option Dependency |
| 2026-05-01 | [`buildPdpUrl` Utility — `@clicktap/ui/utils/buildPdpUrl`](./2026/05/2026-05-01-build-pdp-url-util.md) | No | *None* |
| 2026-05-03 | [Auth-aware GraphQL client — `@clicktap/ui/utils/createAuthAwareGraphqlClient`](./2026/05/2026-05-03-auth-aware-graphql-client.md) | No | *None* |
| 2026-05-20 | [framer-motion 11.x idioms — opacity-only for modals, primitives elsewhere, matched keyframe shapes](./2026/05/2026-05-20-framer-motion-11-idioms.md) ↔ | Yes (custom `animationVariants` only) | *None* |
| 2026-05-21 | [`ButtonLoadingContent` helper — right-side spinner for all submit buttons](./2026/05/2026-05-21-button-loading-content.md) ↔ | No | *None* |
| 2026-05-21 | [`PasswordCheck` `requirements` variant hides until the visitor types](./2026/05/2026-05-21-password-check-hide-on-empty.md) | No | *None* |
| 2026-05-29 | [`PasswordCheck` — the `requirements` variant (adoption guide for forks)](./2026/05/2026-05-29-password-check-requirements-variant.md) | No | PasswordCheck hide-on-empty |
| 2026-06-17 | [Select standardization — one `<Select searchable>`, `DropdownSelect` removed](./2026/06/2026-06-17-select-standardization.md) ↔ | Yes | *None* |

↔ = cross-app migration (has counterpart in frontend app)
