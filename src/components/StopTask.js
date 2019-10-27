import React from 'react';
import '../scss/StopTask.scss';

const StopTask = (props) => {
  const { compClassName, changeState } = props;

  return (
    <section className={compClassName}>
      <div className="StopTask__container">
        <h2 className="StopTask__heading">
          Are you sure you want to quit?
        </h2>
        <button
          className="StopTask__button StopTask__button--stop"
          onClick={() => changeState({
            isTaskVisible: true,
            isStopTaskVisible: false,
            isTaskTimeActive: false,
            isBreakTimeActive: false
          })}
        >
          Yes
        </button>
        <button
          className="StopTask__button StopTask__button--cancel"
          onClick={() => changeState({
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