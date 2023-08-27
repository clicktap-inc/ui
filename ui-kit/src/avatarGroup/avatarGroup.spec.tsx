import { render } from '@testing-library/react';

import { AvatarGroup } from './avatarGroup';
import { Avatar } from '../avatar/avatar';

describe('AvatarGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AvatarGroup>
        <Avatar
          image={<img src="//api.lorem.space/image/face?w=150&h=150" alt="" />}
        />
      </AvatarGroup>
    );
    expect(baseElement).toBeTruthy();
  });
});
