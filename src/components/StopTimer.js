import React from 'react';
import classNames from 'classnames';
import '../scss/StopTimer.scss';

const StopTimer = (props) => {
  const { isStopTimerVisible, onStateChange } = props;

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
          onClick={() => onStateChange({
            isTaskVisible: true,
            isStopTaskVisible: false,
            isTimerVisible: false,
            isTaskTimeActive: false,
            isBreakTimeActive: false,
            taskName: "",
            isTaskNameValid: false,
            taskTimePlanned: "",
            isTaskTimePlannedValid: false,
            breakTimePlanned: "",
            isBreakTimePlannedValid: false
          })}
        >
          Yes
        </button>
        <button
          className="StopTimer__button StopTimer__button--cancel"
          onClick={() => onStateChange({
            isStopTaskVisible: false
          })}
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
export default StopTimer;