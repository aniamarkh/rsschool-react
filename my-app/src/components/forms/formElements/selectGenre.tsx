import React from 'react';
import { InputProps, GenreObj } from 'types/types';

export default function GenreSelect(props: InputProps) {
  const { label, name, register, registerOptions } = props;
  const priceOptions: GenreObj[] = [
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Horror', label: 'Horror' },
  ];

  return (
    <div className="input-date">
      <label className="input-title" htmlFor={label}>
        {label}
      </label>
      <select defaultValue="default" id={label} {...register(name, registerOptions)}>
        <option value="default" disabled hidden>
          ...
        </option>
        {priceOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
