import React from 'react';

export interface ErrorMessageProps {
  errorStr: string | undefined;
}

export default function ErrorMessage(props: ErrorMessageProps) {
  const { errorStr } = props;
  const displayMessage = errorStr || 'Error';

  return <p className="error-message">{displayMessage}</p>;
}
