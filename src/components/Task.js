import React, { Component } from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Task&Time.scss';

class Task extends Component {

  handleNextView = (e) => {
    const { taskNameValidity, onStateChange } = this.props;
    const keyPressed = e.key || null;
    
    if (keyPressed === 'Enter' || keyPressed === null) {
      if (taskNameValidity) {
        onStateChange({
          isTaskVisible: false,
          isTimeVisible: true,
          isTaskNameChangeActive: false,
          alertFlag: false
        })
      } else {
        onStateChange({ alertFlag: true })
      }
    }
  }

  render() {
    const {
      compClassName,
      alertClassName,
      taskName,
      onStateChange,
      onTaskNameChange
    } = this.props;

    return (
      <section
        className={`Task ${compClassName}`}
        onKeyDown={(e) => this.handleNextView(e)}
        tabIndex="0"
        autoFocus
      >
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
          onClick={this.handleNextView}
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
}
export default Task;