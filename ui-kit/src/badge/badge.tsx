import { BadgeProps, BadgeDotProps } from './badge.props';
import { StyledBadge, StyledBadgeDot } from './badge.styles';

function BadgeDot({ color = 'gray-400', ...rest }: BadgeDotProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledBadgeDot color={color} {...rest} />;
}

const badgeDotDefaultProps: BadgeProps = {
  color: 'gray-400',
};
BadgeDot.defaultProps = badgeDotDefaultProps;

export function Badge({
  bg = 'gray-100',
  color = 'gray-800',
  disabled = false,
  shape = 'circle',
  size = 'sm',
  state = 'idle',
  children,
  ...rest
}: BadgeProps) {
  return (
    <StyledBadge
      bg={bg}
      color={color}
      disabled={disabled}
      shape={shape}
      size={size}
      state={state}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {children}
    </StyledBadge>
  );
}

const badgeDefaultProps: BadgeProps = {
  bg: 'gray-100',
  color: 'gray-800',
  disabled: false,
  shape: 'circle',
  size: 'sm',
  state: 'idle',
};
Badge.defaultProps = badgeDefaultProps;

Badge.Dot = BadgeDot;

export default Badge;
