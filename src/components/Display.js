import React from 'react';
import '../scss/Display.scss';

const Display = (props) => {
  const { className, output, onEditModeChange } = props;
  const result = typeof output === 'string'
  ? output : output.join(':');

  return (
    <p
      className={className}
      onClick={onEditModeChange}
    >
      {result}
    </p>
  );
}
export default Display;