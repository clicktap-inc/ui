import { render } from '@testing-library/react';

import { Breadcrumbs } from './breadcrumbs';

describe('Breadcrumbs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Breadcrumbs>
        <Breadcrumbs.Item>Home</Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>Category</Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item current>Product</Breadcrumbs.Item>
      </Breadcrumbs>
    );
    expect(baseElement).toBeTruthy();
  });
});
