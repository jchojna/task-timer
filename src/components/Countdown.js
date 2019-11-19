import React from 'react';
import classNames from 'classnames';
import TimeDisplay from './TimeDisplay';
import '../scss/Countdown.scss';

const Countdown = (props) => {

  const {
    modifier,
    isElapsedMode,
    elapsedTimeArray,
    remainingTimeArray,
    isCountdownVisible,
    totalBreaks
  } = props;

  const breaksAmount = `${totalBreaks}
    ${totalBreaks === 1 ? "break" : "breaks"} used
  `;

  const countdownClass = classNames(`Countdown Countdown--${modifier}`, {
    "Countdown--visible": isCountdownVisible,
    "showFromRight": isCountdownVisible,
    "hideToLeft": !isCountdownVisible,
  });

  return (
    <div className={countdownClass}>

      { /* ACTIVE MODE */
        modifier === 'taskTime'
        ? <h3 className="Countdown__heading">Working Mode</h3>
        : <h3 className="Countdown__heading">Break Mode</h3>
      }
      { /* ELAPSED / REMAINING TIME */
        isElapsedMode
        ? <p className="Countdown__timeType">Elapsed Time</p>
        : <p className="Countdown__timeType">Remaining Time</p>
      }
      {/* BREAKS COUNTER */}
      <p className="Countdown__breaks">{breaksAmount}</p>
      {/* TIMER DISPLAY */}
      <TimeDisplay
        type={modifier}
        isElapsedMode={isElapsedMode}
        elapsedTimeArray={elapsedTimeArray}
        remainingTimeArray={remainingTimeArray}
      />
    </div>
  );
}
export default Countdown;