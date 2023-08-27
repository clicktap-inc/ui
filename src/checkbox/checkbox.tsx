// import { useState } from 'react';
// import type { KeyboardEvent } from 'react';
import { CheckboxProps } from './checkbox.props';
import { CheckboxInput, CheckboxLabel, CheckboxWrap } from './checkbox.styles';
// import { HiddenCheckboxInput, Rail, SwitchWrap, Toggle } from './switch.styles';

export function Checkbox(props: CheckboxProps) {
  const { defaultChecked, id, label } = props;
  // const [isChecked, setIsChecked] = useState(defaultChecked ?? false);

  // const handleClick = () => {
  //   setIsChecked(!isChecked);
  // };

  // const handleKeyDown = (e: KeyboardEvent) => {
  //   if (e.key === ' ' || e.code === 'Space' || e.keyCode === 32) {
  //     e.preventDefault();
  //     setIsChecked(!isChecked);
  //   }
  // };

  return (
    <CheckboxWrap>
      {/* <CheckboxWrap
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="checkbox"
        aria-checked={isChecked}
      >
        <Control isChecked={isChecked} tabIndex={0}>
          <Checkmark isChecked={isChecked} />
        </Control>
        {label}
      </CheckboxWrap> */}

      <CheckboxInput
        type="checkbox"
        defaultChecked={defaultChecked}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
      <CheckboxLabel htmlFor={id}>{label}</CheckboxLabel>

      {/* <HiddenCheckboxInput type="checkbox" checked={isChecked} {...props} /> */}
    </CheckboxWrap>
  );
}

export default Checkbox;
