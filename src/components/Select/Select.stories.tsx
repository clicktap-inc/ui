import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef, useState } from 'react';
import { useAsyncList } from 'react-stately';
import type { Key } from 'react-aria-components';
import { Select } from './Select';
import { Option } from './Option';
import { Input } from '../Input/Input';

const meta: Meta<typeof Select> = { component: Select };
export default meta;
type Story = StoryObj<typeof Select>;

// One <Select>; `searchable` picks the mode. Both are controlled — wire
// `selectedKey` + `onSelectionChange`.

// Default (searchable omitted) = button-style picker: click to open, pick one.
// Right for short fixed lists like a sort control.
function SortBySelect() {
  const [selectedKey, setSelectedKey] = useState<Key | null>('product_name');
  return (
    <div style={{ width: 220 }}>
      <Select
        label="Sort by"
        selectedKey={selectedKey}
        onSelectionChange={setSelectedKey}
      >
        <Option key="product_name">Product Name</Option>
        <Option key="price">Price</Option>
        <Option key="date">Date</Option>
      </Select>
    </div>
  );
}

export const Picker: Story = {
  render: () => <SortBySelect />,
};

// `searchable` = combobox: type to filter; the first match highlights and
// Enter/Tab commit it, and Tab then advances to the next field. Right for long
// lists like a country picker. (Second field on the right so you can see Tab
// move focus there.)
//
// The option keys are CODES ("us"); `textValue` carries the name AND the code so
// typing the code ("us") filters to the row — while the field still displays the
// name (the combobox shows the rendered children, not textValue).
const countries = [
  { code: 'ca', name: 'Canada' },
  { code: 'cm', name: 'Cameroon' },
  { code: 'cl', name: 'Chile' },
  { code: 'cn', name: 'China' },
  { code: 'co', name: 'Colombia' },
  { code: 'fr', name: 'France' },
  { code: 'de', name: 'Germany' },
  { code: 'us', name: 'United States' },
];

function CountrySelect() {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ width: 260 }}>
        <Select
          searchable
          label="Country (type a name or code, e.g. 'us')"
          selectedKey={selectedKey}
          onSelectionChange={setSelectedKey}
        >
          {countries.map(({ code, name }) => (
            <Option key={code} textValue={`${name} ${code}`}>
              {name}
            </Option>
          ))}
        </Select>
      </div>
      <div style={{ width: 200 }}>
        <Input label="Postal code" placeholder="Tab lands here" />
      </div>
    </div>
  );
}

export const Searchable: Story = {
  render: () => <CountrySelect />,
};

// `searchable="auto"` turns searchable on once there are more than ~8 options.
function AutoSelect() {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const options = [
    { code: 'ca', name: 'Canada' },
    { code: 'cm', name: 'Cameroon' },
    { code: 'cl', name: 'Chile' },
    { code: 'cn', name: 'China' },
    { code: 'co', name: 'Colombia' },
    { code: 'fr', name: 'France' },
    { code: 'de', name: 'Germany' },
    { code: 'jp', name: 'Japan' },
    { code: 'mx', name: 'Mexico' },
    { code: 'us', name: 'United States' },
  ];
  return (
    <div style={{ width: 260 }}>
      <Select
        searchable="auto"
        label="Country (auto: searchable past 8)"
        selectedKey={selectedKey}
        onSelectionChange={setSelectedKey}
      >
        {options.map(({ code, name }) => (
          <Option key={code} textValue={`${name} ${code}`}>
            {name}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export const SearchableAuto: Story = {
  render: () => <AutoSelect />,
};

// Searchable, with the auto-highlight/select-on-focus opted out for a strict
// "no accidental commit" field.
function StrictCountrySelect() {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  return (
    <div style={{ width: 260 }}>
      <Select
        searchable
        label="Country (strict)"
        autoFocusFirstOption={false}
        selectTextOnFocus={false}
        selectedKey={selectedKey}
        onSelectionChange={setSelectedKey}
      >
        <Option key="ca">Canada</Option>
        <Option key="fr">France</Option>
        <Option key="de">Germany</Option>
        <Option key="us">United States</Option>
      </Select>
    </div>
  );
}

export const StrictNoAutoCommit: Story = {
  render: () => <StrictCountrySelect />,
};

// Data-source mock: a component library has no GraphQL client, so the "query"
// is just a fake async function (promise + delay). This exercises the same async
// paths a real query hits — `isLoading` spinner while in flight, options arriving
// late, and a PRE-SELECTED value ("us") that has no matching option until the
// data loads (it must still render "United States" once it does). Swap
// `fetchCountries` for your real `useCountryCollection()` etc. in an app story.
type Country = { code: string; name: string };

function fetchCountries(): Promise<Country[]> {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          { code: 'ca', name: 'Canada' },
          { code: 'fr', name: 'France' },
          { code: 'de', name: 'Germany' },
          { code: 'jp', name: 'Japan' },
          { code: 'mx', name: 'Mexico' },
          { code: 'us', name: 'United States' },
        ]),
      1200,
    );
  });
}

function AsyncCountrySelect() {
  const [items, setItems] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Pre-selected before the data exists — proves the label resolves on load.
  const [selectedKey, setSelectedKey] = useState<Key | null>('us');

  useEffect(() => {
    let active = true;
    fetchCountries().then((data) => {
      if (active) {
        setItems(data);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div style={{ width: 260 }}>
      <Select
        searchable
        label="Country (loaded from a mock query)"
        isLoading={isLoading}
        selectedKey={selectedKey}
        onSelectionChange={setSelectedKey}
      >
        {items.map(({ code, name }) => (
          <Option key={code} textValue={`${name} ${code}`}>
            {name}
          </Option>
        ))}
      </Select>
    </div>
  );
}

// Shows a spinner for ~1.2s, then the options populate and the pre-selected
// "United States" appears — the async-arrival behavior used by the country/region
// fields. (Reload the story to see the loading state again.)
export const AsyncDataSource: Story = {
  render: () => <AsyncCountrySelect />,
};

// Server-side type-ahead for a LARGE pool: don't load 10k rows into the browser
// and filter client-side — fetch a filtered slice per keystroke. `useAsyncList`
// drives it: its `load({ filterText, signal })` runs on each input change, and
// `signal` cancels the in-flight request when the query changes again (so a slow
// response can't clobber a newer one). The Select takes the results via `items`
// and the query via the controlled `inputValue`/`onInputChange` — it does NO
// client-side filtering in this mode (the server already filtered). Swap
// `searchProducts` for a real GraphQL search query in an app.
type Product = { id: string; name: string };

// A deterministic 10k-row "database" (no Math.random, so the story is stable).
const ADJ = [
  'Crimson',
  'Azure',
  'Olive',
  'Amber',
  'Slate',
  'Ivory',
  'Teal',
  'Maroon',
];
const MAT = [
  'Cotton',
  'Leather',
  'Denim',
  'Merino',
  'Canvas',
  'Linen',
  'Nylon',
];
const KIND = [
  'Jacket',
  'Backpack',
  'Sneaker',
  'Cap',
  'Sling',
  'Tee',
  'Hoodie',
  'Glove',
];
const PRODUCT_POOL: Product[] = Array.from({ length: 10000 }, (_, i) => ({
  id: `p-${i}`,
  name: `${ADJ[i % ADJ.length]} ${MAT[(i * 3) % MAT.length]} ${KIND[(i * 7) % KIND.length]} #${i}`,
}));
const PRODUCT_BY_ID = new Map(PRODUCT_POOL.map((p) => [p.id, p]));

// Stand-in for a server: filters the pool, caps to 50 rows, ~150ms latency,
// abortable so stale type-ahead requests are cancelled.
function searchProducts(
  query: string,
  signal?: AbortSignal,
): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    const handle = setTimeout(() => {
      const q = query.trim().toLowerCase();
      const matches = q
        ? PRODUCT_POOL.filter((p) => p.name.toLowerCase().includes(q))
        : PRODUCT_POOL;
      resolve(matches.slice(0, 50));
    }, 150);
    signal?.addEventListener('abort', () => {
      clearTimeout(handle);
      reject(new DOMException('aborted', 'AbortError'));
    });
  });
}

function ServerSearchSelect() {
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  // `query` controls the input directly so it stays responsive on every
  // keystroke; the async search is debounced off it (below).
  const [query, setQuery] = useState('');
  const list = useAsyncList<Product>({
    async load({ filterText, signal }) {
      const items = await searchProducts(filterText ?? '', signal);
      return { items };
    },
  });

  // Debounce the SEARCH, not the input: fire the fetch 150ms after typing stops.
  // `useAsyncList`'s setFilterText isn't a stable reference, so we read it from a
  // ref and depend ONLY on `query` — otherwise the effect re-runs every render
  // and re-triggers the fetch in a loop (spinner ↔ chevron flicker). The
  // setTimeout also keeps the setState off the synchronous effect path.
  const setFilterTextRef = useRef(list.setFilterText);
  useEffect(() => {
    setFilterTextRef.current = list.setFilterText;
  }, [list.setFilterText]);
  useEffect(() => {
    const handle = setTimeout(() => setFilterTextRef.current(query), 150);
    return () => clearTimeout(handle);
  }, [query]);

  const isLoading =
    list.loadingState === 'loading' || list.loadingState === 'filtering';
  const selected =
    selectedKey != null ? PRODUCT_BY_ID.get(String(selectedKey)) : null;

  return (
    <div style={{ width: 340 }}>
      <Select
        searchable
        label={`Search ${PRODUCT_POOL.length.toLocaleString()} products (server-side)`}
        items={list.items}
        inputValue={query}
        onInputChange={setQuery}
        isLoading={isLoading}
        selectedKey={selectedKey}
        onSelectionChange={(key) => {
          setSelectedKey(key);
          // Controlled input: reflect the picked item's name so the field shows
          // it — Tab/Enter completion lands here too. Focus stays in the input
          // (isLoading no longer disables it), so you can keep typing.
          const item = key != null ? PRODUCT_BY_ID.get(String(key)) : null;
          setQuery(item ? item.name : '');
        }}
      >
        {(item) => (
          <Option key={item.id} textValue={item.name}>
            {item.name}
          </Option>
        )}
      </Select>
      <p style={{ marginTop: 8, fontSize: 12, color: '#64748b' }}>
        Selected: {selected ? selected.name : '—'}
      </p>
    </div>
  );
}

// Type e.g. "azure denim" or "sneaker #42": after a 150ms pause it fetches a
// fresh filtered slice (max 50 rows) with a spinner, never loading all 10k. The
// input stays focused while results load so you can keep typing, the first result
// highlights so Tab/Enter completes it, and the Select shows exactly the server's
// results — no client-side filtering in this mode.
export const ServerSideSearch: Story = {
  render: () => <ServerSearchSelect />,
};
