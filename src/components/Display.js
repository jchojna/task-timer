import React from 'react';
import '../scss/Display.scss';

const Display = (props) => {
  const taskTimeResult = props.taskTimeArray.join(':');

  return (
    <p className={`Display ${props.compClassName}`}>
      {taskTimeResult}
    </p>
  );
}
export default Display;