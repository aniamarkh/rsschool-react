import React from 'react';

export default class ErrorMessage extends React.Component<{ errorStr: string }> {
  render(): React.ReactNode {
    const { errorStr } = this.props;

    return <p>{errorStr}</p>;
  }
}
