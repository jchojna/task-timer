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
        className="Timer__display"
        elapsedTimeArray={elapsedTimeArray}
        remainingTimeArray={remainingTimeArray}
      />

      {/* PROGRESS */}
      <Progress
        isElapsedMode={isElapsedMode}
        elapsedTaskPercent={elapsedTaskPercent}
        remainingTaskPercent={remainingTaskPercent}
      />
    </div>
  );
}
export default Countdown;