import React from 'react';
import '../scss/Display.scss';

const Display = (props) => {
  return (
    <p className={`Display ${props.compClassName}`}>
      00:00:00
    </p>
  );
}
export default Display;