import React from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Task&Time.scss';

const Task = (props) => {
  const {
    compClassName,
    alertClassName,
    taskName,
    taskNameValidity,
    onStateChange,
    onTaskNameChange
  } = props;

  return (
    <section className={`Task ${compClassName}`}>
      {/* TASK HEADING */}
      <h2 className="Task__heading">Write your task</h2>
      {/* TASK NAME INPUT */}
      <input
        className="Task__input Task__input--name"
        id="task-name"
        placeholder="What would be your next task?"
        onChange={(e) => {
          onTaskNameChange(e.target.value);
          onStateChange({ alertFlag: true })
        }}
        value={taskName}
      />
      {/* TASK NAME LABEL */}
      <label className="Task__label Task__label--name visuallyhidden" htmlFor="task-name">
        Your task
      </label>
      {/* RIGHT BUTTON */}
      <button 
        className="button Task__button Task__button--right"
        onClick={taskNameValidity
          ? () => onStateChange({
            isTaskVisible: false,
            isTimeVisible: true,
            isTaskNameChangeActive: false,
            alertFlag: false
          })
          : () => onStateChange({ alertFlag: true })}
      >
        <svg className="Task__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-right`} />
        </svg>
      </button>
      {/* ALERT */}
      <p className={`Task__alert ${alertClassName}`}>
        You have to enter your task first!
      </p>
    </section>
  );
}
export default Task;