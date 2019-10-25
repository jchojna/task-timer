import React from 'react';
import '../scss/Display.scss';

const Display = (props) => {
  const taskTimeResult = props.taskTimeArray.join(':');

  return (
    <p className={props.compClassName}>
      {taskTimeResult}
    </p>
  );
}
export default Display;