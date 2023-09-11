import { ReactEventHandler, useState } from 'react';
import { AvatarProps } from './avatar.props';
import {
  AvatarIcon,
  AvatarText,
  AvatarOverlay,
  AvatarImage,
  AvatarRoot,
} from './avatar.styles';
import { defaultTheme } from '../theming/theming';

// Avatar 76
export function Avatar({
  css = {},
  theme = defaultTheme,
  variant = 'circular',
  size = 'md',
  width = '',
  height = '',
  icon,
  // TODO
  // state = 'idle',
  text = '',
  fallback,
  image,
  overlay,
  overlayX = 'right',
  overlayY = 'top',
}: AvatarProps) {
  const [error, setError] = useState(false);

  const onError: ReactEventHandler<HTMLImageElement> = () => {
    setError(true);
  };

  return (
    <AvatarRoot
      theme={theme}
      css={css}
      width={width}
      height={height}
      size={size}
    >
      {text && (
        <AvatarText theme={theme} variant={variant} size={size}>
          {text}
        </AvatarText>
      )}

      {icon && (
        <AvatarIcon theme={theme} variant={variant}>
          {icon}
        </AvatarIcon>
      )}

      {image && (
        <>
          {error &&
            (fallback?.type === 'img' ? (
              <AvatarImage
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...fallback.props}
                theme={theme}
                variant={variant}
              />
            ) : (
              fallback
            ))}

          {!error &&
            (image?.type === 'img' ? (
              <AvatarImage
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...image.props}
                theme={theme}
                variant={variant}
                onError={onError}
              />
            ) : (
              image
            ))}
        </>
      )}

      {overlay && (
        <AvatarOverlay overlayX={overlayX} overlayY={overlayY}>
          {overlay}
        </AvatarOverlay>
      )}
    </AvatarRoot>
  );
}

const avatarDefaultProps: AvatarProps = {
  theme: defaultTheme,
  size: 'md',
  variant: 'circular',
  state: 'idle',
  overlayX: 'right',
  overlayY: 'top',
};

Avatar.defaultProps = avatarDefaultProps;

export { AvatarRoot };
export default Avatar;
