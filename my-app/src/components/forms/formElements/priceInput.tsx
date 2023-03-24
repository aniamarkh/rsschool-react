import React from 'react';
import { InputProps, PriceObj } from 'types/types';

export default class PriceSelect extends React.Component<InputProps> {
  render() {
    const { label, selectRef } = this.props;
    const priceOptions: PriceObj[] = [
      { value: 26, label: '26' },
      { value: 30, label: '30' },
      { value: 35, label: '35' },
    ];

    return (
      <div className="input-date">
        <label htmlFor={label}>{label}</label>
        <select defaultValue="default" id={label} ref={selectRef}>
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
}
