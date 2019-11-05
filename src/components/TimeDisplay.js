import React from 'react';
import '../scss/TimeDisplay.scss';

const TimeDisplay = (props) => {
  const { className, timeArray } = props;
  const timeResult = timeArray.join(':');

  return (
    <div className={className}>
      {timeResult}
    </div>
  );
}
export default TimeDisplay;