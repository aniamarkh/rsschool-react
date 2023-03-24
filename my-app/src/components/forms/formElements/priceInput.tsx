import React from 'react';
import { InputProps } from 'types/types';
import { priceOptions } from '../../../data/prices';

export default class PriceInput extends React.Component<InputProps> {
  render() {
    const { label, selectRef } = this.props;
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
