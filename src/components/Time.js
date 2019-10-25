import React from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Task_Time.scss';

const Time = (props) => {
  return (
    <section className={`Time ${props.compClassName}`}>
      <h2 className="Time__heading">Task Time Estimation</h2>
      {/* LEFT BUTTON */}
      <button
        className="Time__button Time__button--left"
        onClick={() => props.isVisible({
          isTaskVisible: true,
          isTimeVisible: false
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
          onChange={(e) => props.taskTimePlanned(e.target.value)}
        />
        <input
          id="task-break"
          className="Time__input"
          placeholder="00m00s"
          maxLength="6"
          onChange={(e) => props.breakTimePlanned(e.target.value)}
        />
        <button
          className={`Time__start ${props.isTimerActive
            ? "Time__start--disabled"
            : ""}`}
          onClick={props.taskTimePlannedValidity && props.breakTimePlannedValidity
          ? props.handleStartButton
          : undefined}
          disabled = {props.isTimerActive}
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
        <p className={`Time__alert ${props.alertClassName}`}>
          You have to specify time in the following format: 0m0s
        </p>
      </div>
    </section>
  );
}
export default Time;