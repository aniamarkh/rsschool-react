import React from 'react';
import { InputProps } from 'types/types';

export default function TextInput(props: InputProps) {
  const { label, name, register, registerOptions } = props;
  return (
    <div className="input-text">
      <label className="input-title" htmlFor={label}>
        {label}
      </label>
      <input type="text" id={label} {...register(name, registerOptions)} />
    </div>
  );
}
