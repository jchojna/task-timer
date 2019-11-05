import React from 'react';
import classNames from 'classnames';
import '../scss/TimeDisplay.scss';

const TimeDisplay = (props) => {
  const {
    className,
    elapsedTimeArray,
    remainingTimeArray,
    isElapsedMode
  } = props;

  const elapsedTimeResult = elapsedTimeArray.join(':');
  const remainingTimeResult = remainingTimeArray.join(':');

  const elapsedTimeClass = classNames({
    "TimeDisplay TimeDisplay--visible TimeDisplay--showUp": isElapsedMode,
    "TimeDisplay TimeDisplay--hideUp": !isElapsedMode
  });
  
  const remainingTimeClass = classNames({
    "TimeDisplay TimeDisplay--visible TimeDisplay--showUp": !isElapsedMode,
    "TimeDisplay TimeDisplay--hideUp": isElapsedMode
  });

  return (
    <div className={className}>
      <div className={elapsedTimeClass}>
        {elapsedTimeResult}
      </div>
      <div className={remainingTimeClass}>
        {remainingTimeResult}
      </div>
    </div>
  );
}
export default TimeDisplay;