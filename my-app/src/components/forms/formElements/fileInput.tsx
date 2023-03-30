import React from 'react';
import { InputProps } from 'types/types';

export default class FileInput extends React.Component<InputProps> {
  render() {
    const { label, inputRef } = this.props;
    return (
      <div className="input-file">
        <label className="input-title" htmlFor={label}>
          {label}
        </label>
        <input accept="image/png, image/jpeg" type="file" id={label} ref={inputRef} />
      </div>
    );
  }
}
