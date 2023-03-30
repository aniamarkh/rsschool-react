import React from 'react';
import { InputProps } from 'types/types';

export default function DateInput(props: InputProps) {
  const { label, inputRef } = props;
  return (
    <div className="input-date">
      <label className="input-title" htmlFor={label}>
        {label}
      </label>
      <input type="date" id={label} ref={inputRef} />
    </div>
  );
}
