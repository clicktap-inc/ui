'use client';

import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import type {
  ProductAttributeData,
  SwatchData,
} from '../../../types/collection';

type SwatchLookupEntry = SwatchData & {
  attributeCode: string;
  optionCode: string;
};

type AttributeDataContextValue = {
  attributes: ProductAttributeData[];
  getAttributeByCode: (code: string) => ProductAttributeData | undefined;
  getSwatchLookup: () => Map<string, SwatchLookupEntry>;
};

const AttributeDataContext = createContext<AttributeDataContextValue | null>(
  null,
);

export function useAttributeData(): AttributeDataContextValue {
  const ctx = useContext(AttributeDataContext);
  if (!ctx) {
    throw new Error(
      'useAttributeData must be used within an AttributeDataProvider',
    );
  }
  return ctx;
}

type AttributeDataProviderProps = {
  attributes: ProductAttributeData[];
};

export function AttributeDataProvider({
  attributes,
  children,
}: PropsWithChildren<AttributeDataProviderProps>) {
  const value = useMemo(() => {
    const byCode = new Map(attributes.map((a) => [a.code, a]));

    const swatchLookup = new Map<string, SwatchLookupEntry>();
    for (const attr of attributes) {
      for (const opt of attr.options) {
        if (opt.swatch) {
          swatchLookup.set(opt.id, {
            ...opt.swatch,
            attributeCode: attr.code,
            optionCode: opt.code,
          });
        }
      }
    }

    return {
      attributes,
      getAttributeByCode: (code: string) => byCode.get(code),
      getSwatchLookup: () => swatchLookup,
    };
  }, [attributes]);

  return (
    <AttributeDataContext.Provider value={value}>
      {children}
    </AttributeDataContext.Provider>
  );
}
