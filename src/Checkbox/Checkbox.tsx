import { CheckboxProps } from 'react-aria-components';
import { Control, StyledCheckbox, StyledSvg } from './styles';

export function Checkbox({ children, ...props }: CheckboxProps) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StyledCheckbox {...props}>
      {({ isIndeterminate }) => (
        <>
          <Control>
            <StyledSvg viewBox="0 0 18 18" aria-hidden="true">
              {isIndeterminate ? (
                <rect x={1} y={7.5} width={15} height={3} />
              ) : (
                <polyline points="1 9 7 14 15 4" />
              )}
            </StyledSvg>
          </Control>
          {children}
        </>
      )}
    </StyledCheckbox>
  );
}

export default Checkbox;
