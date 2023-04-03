import React from 'react';
import { InputProps } from 'types/types';

export default function CheckboxInput(props: InputProps) {
  const { label, name, register, registerOptions } = props;
  return (
    <label className="input-title, input-checkbox" htmlFor={label}>
      <input
        data-testid="checkbox"
        type="checkbox"
        id={label}
        {...register(name, registerOptions)}
      />
      {label}
    </label>
  );
}
