import React from 'react';
import { RadioGroupProps } from 'types/types';

export default function RadioGroup(props: RadioGroupProps) {
  const { label, radioGroupRefs, onChange } = props;
  const options = [
    { value: 0, label: 'No' },
    { value: 1, label: 'Yes' },
  ];

  return (
    <div className="radio">
      <p className="input-title">{label}</p>
      <div className="input-radio">
        {options.map((option, index) => (
          <div key={index}>
            <input
              ref={radioGroupRefs[index]}
              type="radio"
              id={option.label}
              name={label}
              value={option.value}
              onChange={onChange}
            />
            <label htmlFor={option.label}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
