import { render } from '@testing-library/react';

import { Flex } from './flex';

describe('Flex', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Flex>Flex</Flex>);
    expect(baseElement).toBeTruthy();
  });
});
