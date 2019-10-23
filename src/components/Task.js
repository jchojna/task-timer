import React from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Task.scss';

const Task = () => {
  return (
    <section className="Task Task--visible">
      <h2 className="Task__heading">Write your task</h2>
      <input
        className="Task__input Task__input--name"
        id="task-name"
        placeholder="What would be your next task?"
      />
      <button className="button Task__button Task__button--right">
        <svg className="Task__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-right`} />
        </svg>
      </button>
      <div className="Task__row">
        <label className="Task__label Task__label--name" htmlFor="task-name">
          Your task
        </label>
        <p className="Task__alert">
          You have to enter your task first!
        </p>
      </div>
    </section>
  );
}
export default Task;