import { useContext } from 'react';
import { TabRenderProps } from 'react-aria-components';
import { StyledTab, TabOverlay } from './styles';
import { TabProps } from './types';
import { TabsOrientationContext } from './Tabs';

export function Tab({ variant = 'base', children, ...props }: TabProps) {
  const orientation = useContext(TabsOrientationContext);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledTab orientation={orientation} variant={variant} {...props}>
      {(renderProps: TabRenderProps) => (
        <>
          {typeof children === 'function'
            ? children({
                defaultChildren: undefined,
                ...renderProps,
              })
            : children}

          {(renderProps.isFocusVisible || renderProps.isSelected) && (
            <TabOverlay
              orientation={orientation}
              layoutId={variant}
              variant={variant}
              transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 0.75,
              }}
            />
          )}
        </>
      )}
    </StyledTab>
  );
}

export default Tab;
