import React from 'react';
import TimeDisplay from './TimeDisplay';
import Progress from './Progress';
import Controls from './Controls';
import '../scss/Countdown.scss';

const Countdown = (props) => {

  const {
    modifier,
    isElapsedMode,
    elapsedTimeArray,
    remainingTimeArray,
    elapsedTaskPercent,
    remainingTaskPercent,
    isTaskTimeActive,
    isBreakTimeActive,
    totalBreaks,
    onDisplayModeChange,
    onTimerStateChange,
    onTaskStateChange
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
      
      {/* CONTROL BUTTONS */}
      <Controls
        isTaskTimeActive={isTaskTimeActive}
        isBreakTimeActive={isBreakTimeActive}
        totalBreaks={totalBreaks}
        onDisplayModeChange={onDisplayModeChange}
        onTimerStateChange={onTimerStateChange}
        onTaskStateChange={onTaskStateChange}
      />
    </div>
  );
}
export default Countdown;