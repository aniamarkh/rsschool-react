import React from 'react';
import { InputProps } from 'types/types';

export default function FileInput(props: InputProps) {
  const { label, name, register, registerOptions } = props;
  return (
    <div className="input-file">
      <label className="input-title" htmlFor={label}>
        {label}
      </label>
      <input
        accept="image/png, image/jpeg"
        type="file"
        id={label}
        {...register(name, registerOptions)}
      />
    </div>
  );
}
