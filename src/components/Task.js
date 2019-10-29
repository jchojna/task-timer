import React from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Task&Time.scss';

const Task = (props) => {

  return (
    <section className={`Task ${props.compClassName}`}>
      {/* TASK HEADING */}
      <h2 className="Task__heading">Write your task</h2>
      {/* TASK NAME INPUT */}
      <input
        className="Task__input Task__input--name"
        id="task-name"
        placeholder="What would be your next task?"
        onChange={(e) => {
          props.changeTaskName(e.target.value);
          props.changeState({ alertFlag: true })
        }}
        value={props.taskName}
      />
      {/* TASK NAME LABEL */}
      <label className="Task__label Task__label--name visuallyhidden" htmlFor="task-name">
        Your task
      </label>
      {/* RIGHT BUTTON */}
      <button 
        className="button Task__button Task__button--right"
        onClick={props.taskNameValidity
          ? () => props.changeState({
            isTaskVisible: false,
            isTimeVisible: true,
            isTaskNameChangeActive: false,
            alertFlag: false
          })
          : () => props.changeTaskName("")}
      >
        <svg className="Task__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-right`} />
        </svg>
      </button>
      {/* ALERT */}
      <p className={`Task__alert ${props.alertClassName}`}>
        You have to enter your task first!
      </p>
    </section>
  );
}
export default Task;