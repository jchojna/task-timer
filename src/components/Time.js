import React from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Task&Time.scss';

const Time = (props) => {

  const {
    compClassName,
    alertClassName,
    changeState,
    handleTimeArray,
    changeTaskTimePlanned,
    taskTimePlannedValidity,
    taskTimePlanned,
    breakTimePlanned,
    breakTimePlannedValidity,
    isTimerActive
  } = props;

  const breakTimeElapsedResult = handleTimeArray(0);

  return (
    <section className={`Time ${compClassName}`}>
      <h2 className="Time__heading">Estimate a time</h2>
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
      {/* TASK TIME INPUT */}
      <input
        id="task-time"
        className="Time__input Time__input--task-time"
        placeholder="00m00s"
        maxLength="6"
        onChange={(e) => {
          changeTaskTimePlanned(e.target.value);
          changeState({ alertFlag: true })
        }}
        value={taskTimePlanned}
      />
      {/* TASK TIME LABEL */}
      <label className="Time__label Time__label--task-time" htmlFor="task-time">
        task time
      </label>
      {/* BREAK TIME INPUT */}
      <input
        id="break-time"
        className="Time__input Time__input--break-time"
        placeholder="00m00s"
        maxLength="6"
        onChange={(e) => breakTimePlanned(e.target.value)}
      />
      {/* BREAK TIME LABEL */}
      <label className="Time__label Time__label--break-time" htmlFor="break-time">
        max break time
      </label>
      {/* START BUTTON */}
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
          breakTimeElapsedArray: breakTimeElapsedResult,
          alertFlag: false
        })
        : undefined}
        disabled = {isTimerActive}
      >
        Start
      </button>
      {/* ALERT */}
      <p className={`Time__alert ${alertClassName}`}>
        You have to specify time in the following format: 0m0s
      </p>
    </section>
  );
}
export default Time;