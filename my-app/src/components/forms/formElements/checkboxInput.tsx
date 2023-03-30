import React from 'react';
import { InputProps } from 'types/types';

export default function CheckboxInput(props: InputProps) {
  const { label, name, register, registerOptions } = props;
  return (
    <div className="input-checkbox">
      <input type="checkbox" id={label} {...register(name, registerOptions)} />
      <label className="input-title" htmlFor={label}>
        {label}
      </label>
    </div>
  );
}
