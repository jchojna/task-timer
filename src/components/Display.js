import React from 'react';
import '../scss/Display.scss';

const Display = (props) => {
  const { compClassName, taskTimeArray } = props;
  const taskTimeResult = taskTimeArray.join(':');

  return (
    <p className={compClassName}>
      {taskTimeResult}
    </p>
  );
}
export default Display;