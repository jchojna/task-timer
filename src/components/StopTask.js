import React from 'react';
import '../scss/StopTask.scss';

const StopTask = (props) => {
  const { compClassName, onStateChange } = props;

  return (
    <section className={compClassName}>
      <div className="StopTask__container">
        <h2 className="StopTask__heading">
          Are you sure you want to quit?
        </h2>
        <button
          className="StopTask__button StopTask__button--stop"
          onClick={() => onStateChange({
            isTaskVisible: true,
            isStopTaskVisible: false,
            isTimerVisible: false,
            isTaskTimeActive: false,
            isBreakTimeActive: false,
            taskName: null
          })}
        >
          Yes
        </button>
        <button
          className="StopTask__button StopTask__button--cancel"
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
export default StopTask;