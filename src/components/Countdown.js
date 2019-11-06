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

  const breaksAmount = `${totalBreaks}
    ${totalBreaks === 1 ? "break" : "breaks"}`;

  return (
    <div className={`Countdown Countdown--${modifier}`}>

      {/* BREAKS COUNTER */}
      { modifier === 'taskTime'
        ? <h3 className="Countdown__breaks">{breaksAmount}</h3>
        : <div></div> }
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
        onDisplayModeChange={onDisplayModeChange}
        onTimerStateChange={onTimerStateChange}
        onTaskStateChange={onTaskStateChange}
      />
    </div>
  );
}
export default Countdown;