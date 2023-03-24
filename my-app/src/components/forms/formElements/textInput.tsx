import React from 'react';
import { InputProps } from 'types/types';

export default class TextInput extends React.Component<InputProps> {
  render() {
    const { label, inputRef } = this.props;
    return (
      <div className="input-text">
        <label htmlFor={label}>{label}</label>
        <input type="text" id={label} ref={inputRef} />
      </div>
    );
  }
}
