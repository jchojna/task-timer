import React from 'react';
import classNames from 'classnames';
import '../scss/StopTimer.scss';

const StopTimer = (props) => {
  const {
    isStopTimerVisible,
    onTimerStateChange,
    onTimerStop
  } = props;

  const stopClass = classNames("StopTimer", {
    "StopTimer--visible": isStopTimerVisible
  });

  return (
    <section className={stopClass}>
      <div className="StopTimer__container">
        <h2 className="StopTimer__heading">
          Are you sure you want to quit?
        </h2>
        <button
          className="StopTimer__button StopTimer__button--stop"
          onClick={onTimerStop}
        >
          Yes
        </button>
        <button
          className="StopTimer__button StopTimer__button--cancel"
          onClick={() => onTimerStateChange({
            isStopTimerVisible: false
          })}
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
export default StopTimer;