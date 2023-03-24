import React from 'react';
import { InputProps } from 'types/types';

export default class DateInput extends React.Component<InputProps> {
  render() {
    const { label, inputRef } = this.props;
    return (
      <div className="input-date">
        <label htmlFor={label}>{label}</label>
        <input type="date" id={label} ref={inputRef} />
      </div>
    );
  }
}
