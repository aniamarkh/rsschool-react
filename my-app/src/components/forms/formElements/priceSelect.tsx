import React from 'react';
import { InputProps, PriceObj } from 'types/types';

export default function PriceSelect(props: InputProps) {
  const { label, name, register, registerOptions } = props;
  const priceOptions: PriceObj[] = [
    { value: 26, label: '26' },
    { value: 30, label: '30' },
    { value: 35, label: '35' },
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
