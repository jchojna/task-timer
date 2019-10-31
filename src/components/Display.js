import React from 'react';
import '../scss/Display.scss';

const Display = (props) => {
  const { className, taskTimeArray } = props;
  const taskTimeResult = taskTimeArray.join(':');

  return (
    <p className={className}>
      {taskTimeResult}
    </p>
  );
}
export default Display;