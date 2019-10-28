import React from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Task_Time.scss';

const Time = (props) => {

  const {
    compClassName,
    alertClassName,
    changeState,
    handleTimeArray,
    taskTimePlanned,
    taskTimePlannedValidity,
    breakTimePlanned,
    breakTimePlannedValidity,
    isTimerActive
  } = props;

  const breakTimeElapsedResult = handleTimeArray(0);

  return (
    <section className={`Time ${compClassName}`}>
      <h2 className="Time__heading">Task Time Estimation</h2>
      {/* LEFT BUTTON */}
      <button
        className="Time__button Time__button--left"
        onClick={() => changeState({
          isTaskVisible: true,
          isTimeVisible: false,
          isTaskNameChangeActive: true
        })}
      >
        <svg className="Time__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-left`} />
        </svg>
      </button>
      {/* TIME INPUTS AND START BUTTON */}
      <div className="Time__row">
        <input
          id="task-time"
          className="Time__input"
          placeholder="00m00s"
          maxLength="6"
          onChange={(e) => taskTimePlanned(e.target.value)}
        />
        <input
          id="task-break"
          className="Time__input"
          placeholder="00m00s"
          maxLength="6"
          onChange={(e) => breakTimePlanned(e.target.value)}
        />
        <button
          className={`Time__start ${isTimerActive
            ? "Time__start--disabled"
            : ""}`}
          onClick={taskTimePlannedValidity && breakTimePlannedValidity
          ? () => changeState({
            isTimeVisible: false,
            isTimerVisible: true,
            isTaskTimeActive: true,
            previousTime: Date.now(),
            taskTimeElapsed: 0,
            breaksTotal: 0,
            breakTimeElapsed: 0,
            breakTimeElapsedArray: breakTimeElapsedResult
          })
          : undefined}
          disabled = {isTimerActive}
        >
          Start
        </button>
      </div>
      {/* LABELS */}
      <div className="Time__row">
        <label className="Time__label Time__label--task" htmlFor="task-time">
          task time
        </label>
        <label className="Time__label Time__label--break" htmlFor="task-break">
          max break time
        </label>
        <p className={`Time__alert ${alertClassName}`}>
          You have to specify time in the following format: 0m0s
        </p>
      </div>
    </section>
  );
}
export default Time;