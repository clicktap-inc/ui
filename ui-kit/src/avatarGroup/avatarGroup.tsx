/* eslint-disable eslint-comments/disable-enable-pair, react/jsx-props-no-spreading */
import React from 'react';
import { AvatarGroupProps } from './avatarGroup.props';
import { StyledAvatarGroup } from './avatarGroup.styles';
// import theme from '../theming/theming';

export function AvatarGroup({ children, ...props }: AvatarGroupProps) {
  return children ? (
    <StyledAvatarGroup {...props}>
      {React.Children.map(
        children,
        (child, index) =>
          React.isValidElement<AvatarGroupProps>(child) &&
          React.cloneElement(child, {
            css: {
              zIndex:
                props.stackedFrom === 'bottom'
                  ? index
                  : React.Children.count(children) - index,
            },
          })
      )}
    </StyledAvatarGroup>
  ) : null;
}

AvatarGroup.defaultProps = {
  direction: 'horizontal',
  stackedFrom: 'bottom',
};

export default AvatarGroup;
