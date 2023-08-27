import { render } from '@testing-library/react';

import { Avatar } from './avatar';

describe('Avatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Avatar
        image={<img src="//api.lorem.space/image/face?w=150&h=150" alt="" />}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
