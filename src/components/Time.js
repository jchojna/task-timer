import React from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Task_Time.scss';

const Time = () => {
  return (
    <section className="Time Time--visible">
      <h2 className="Time__heading">Task Time Estimation</h2>
      <button className="button Time__button Time__button--left">
        <svg className="Time__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-left`} />
        </svg>
      </button>
      <div className="Time__row">
        <input
          id="task-time"
          className="Time__input"
          placeholder="00m00s"
          maxLength="6"
          pattern="(\d?\d[Mm])?(\d?\d[Ss])?"
        />
        <input
          id="task-break"
          className="Time__input"
          placeholder="00m00s"
          maxLength="6"
          pattern="(\d?\d[Mm])?(\d?\d[Ss])?"
        />
        <button className="button Time__start">
          Start
        </button>
      </div>
      <div className="Time__row">
        <label className="Time__label Time__label--task" htmlFor="task-time">
          task time
        </label>
        <label className="Time__label Time__label--break" htmlFor="task-break">
          max break time
        </label>
        <p className="Time__alert">
          You have to specify time for the task!
        </p>
      </div>
    </section>
  );
}
export default Time;