import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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
