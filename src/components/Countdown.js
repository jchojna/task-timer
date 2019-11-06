import React from 'react';
import TimeDisplay from './TimeDisplay';
import Progress from './Progress';
import '../scss/Countdown.scss';

const Countdown = (props) => {

  const {
    modifier,
    isElapsedMode,
    elapsedTimeArray,
    remainingTimeArray,
    elapsedTaskPercent,
    remainingTaskPercent
  } = props;

  return (
    <div className={`Countdown Countdown--${modifier}`}>
      
      {/* TIMER DISPLAY */}
      <TimeDisplay
        isElapsedMode={isElapsedMode}
        elapsedTimeArray={elapsedTimeArray}
        remainingTimeArray={remainingTimeArray}
      />

      {/* PROGRESS */}
      <Progress
        isElapsedMode={isElapsedMode}
        elapsedPercent={elapsedTaskPercent}
        remainingPercent={remainingTaskPercent}
      />
    </div>
  );
}
export default Countdown;