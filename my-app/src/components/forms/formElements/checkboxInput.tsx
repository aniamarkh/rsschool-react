import React from 'react';
import { InputProps } from 'types/types';

export default class Checkbox extends React.Component<InputProps> {
  render() {
    const { label, inputRef } = this.props;
    return (
      <div className="input-checkbox">
        <input type="checkbox" id={label} ref={inputRef} />
        <label className="input-title" htmlFor={label}>
          {label}
        </label>
      </div>
    );
  }
}
