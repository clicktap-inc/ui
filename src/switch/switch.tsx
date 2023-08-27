import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { SwitchProps } from './switch.props';
import { HiddenCheckboxInput, Rail, SwitchWrap, Toggle } from './switch.styles';

export function Switch(props: SwitchProps) {
  const { defaultChecked, label } = props;
  const [isChecked, setIsChecked] = useState(defaultChecked ?? false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.code === 'Space' || e.keyCode === 32) {
      e.preventDefault();
      setIsChecked(!isChecked);
    }
  };

  return (
    <>
      <SwitchWrap
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="checkbox"
        aria-checked={isChecked}
      >
        <Rail isChecked={isChecked} tabIndex={0}>
          <Toggle isChecked={isChecked} />
        </Rail>
        {label}
      </SwitchWrap>

      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <HiddenCheckboxInput type="checkbox" checked={isChecked} {...props} />
    </>
  );
}

export default Switch;
