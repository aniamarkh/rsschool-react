import React from 'react';

export interface ErrorMessageProps {
  errorStr: string;
}

export default function ErrorMessage(props: ErrorMessageProps) {
  const { errorStr } = props;

  return <p className="error-message">{errorStr}</p>;
}
