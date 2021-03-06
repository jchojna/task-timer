import React from 'react';
import classNames from 'classnames';
import '../scss/TimeDisplay.scss';

const TimeDisplay = (props) => {
  const {
    type,
    elapsedTimeArray,
    remainingTimeArray,
    isElapsedMode
  } = props;

  const elapsedTimeResult = type === 'taskTime'
    ? elapsedTimeArray.join(' : ')
    : elapsedTimeArray.slice(0,2).join(' : ');

  const remainingTimeResult = type === 'taskTime'
    ? remainingTimeArray.join(' : ')
    : remainingTimeArray.slice(0,2).join(' : ');

  const elapsedTimeClass = classNames("TimeDisplay__type",
    "TimeDisplay__type--elapsed", {
    "TimeDisplay__type--visible": isElapsedMode,
    "TimeDisplay__type--showUp" : isElapsedMode,
    "TimeDisplay__type--hideUp" : !isElapsedMode
  });
  
  const remainingTimeClass = classNames("TimeDisplay__type",
    "TimeDisplay__type--remaining", {
    "TimeDisplay__type--visible": !isElapsedMode,
    "TimeDisplay__type--showUp" : !isElapsedMode,
    "TimeDisplay__type--hideUp" : isElapsedMode
  });

  return (
    <div className='TimeDisplay'>
      <div className={elapsedTimeClass}>{elapsedTimeResult}</div>
      <div className={remainingTimeClass}>{remainingTimeResult}</div>
    </div>
  );
}
export default TimeDisplay;