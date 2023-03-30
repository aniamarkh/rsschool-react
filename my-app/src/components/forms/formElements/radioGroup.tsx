import React from 'react';
import { PetOption, InputProps } from 'types/types';

export default function RadioGroup(props: InputProps) {
  const { label, name, register, registerOptions } = props;
  const options: PetOption[] = [
    { value: '', label: 'No' },
    { value: 'true', label: 'Yes' },
  ];

  return (
    <div className="radio">
      <p className="input-title">{label}</p>
      <div className="input-radio">
        {options.map((option, index) => (
          <div key={index}>
            <input
              {...register(name, registerOptions)}
              type="radio"
              id={`${name}-${option.label}`}
              value={option.value}
            />
            <label htmlFor={`${name}-${option.label}`}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
