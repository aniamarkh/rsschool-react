import React from 'react';
import { InputProps } from 'types/types';

export default function CheckboxInput(props: InputProps) {
  const { label, inputRef } = props;
  return (
    <div className="input-checkbox">
      <input type="checkbox" id={label} ref={inputRef} />
      <label className="input-title" htmlFor={label}>
        {label}
      </label>
    </div>
  );
}
