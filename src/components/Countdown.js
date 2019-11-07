import React from 'react';
import classNames from 'classnames';
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
    isCountdownVisible,
    isTaskTimeActive,
    isBreakTimeActive,
    totalBreaks,
    onDisplayModeChange,
    onTimerStateChange,
    onTaskStateChange
  } = props;

  const breaksAmount = `${totalBreaks}
    ${totalBreaks === 1 ? "break" : "breaks"}`;

  const countdownClass = classNames(`Countdown Countdown--${modifier}`, {
    "Countdown--visible": isCountdownVisible,
    "showRight": isCountdownVisible,
    "hideLeft": !isCountdownVisible,
  });

  return (
    <div className={countdownClass}>

      {/* TASK TIME ACTIVE */}
      { modifier === 'taskTime'
        ? <h3 className="Countdown__heading">Task Time Active</h3>
        : <div></div> }
      {/* BREAKS COUNTER */}
      { modifier === 'breakTime'
        ? <h3 className="Countdown__heading">{breaksAmount}</h3>
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