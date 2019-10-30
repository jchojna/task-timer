import React, { Component } from 'react';
//import icons from '../assets/svg/icons.svg';
import '../scss/Creator.scss';

class Creator extends Component {

  /* handlePreviousView = (e) => {
    const { onStateChange } = this.props;
    const keyPressed = e.key || null;

    if (keyPressed === "Escape" || keyPressed === null) {
      onStateChange({
        isTaskVisible: true,
        isTimeVisible: false,
        isTaskNameChangeActive: true
      })
    }
  } */
  
  render() {
    const {
      compClassName,
      alertClassName,
      state,
      onStateChange,
      onTaskNameChange,
      onStartButtonClick,
      onTaskTimePlannedChange,
      onBreakTimePlannedChange
    } = this.props;
  
    const {
      taskName,
      taskTimePlanned,
      breakTimePlanned,
      isTimerActive
    } = state;

    return (
      <section
        className={`Creator ${compClassName}`}
        tabIndex="0"
        autoFocus
        //onKeyDown={(e) => this.handleKeyboard(e)}
      >
        {/* TASK HEADING */}
        <h2 className="Creator__heading">Create a new task</h2>
  
        {/* TASK NAME INPUT */}
        <input
          className="Creator__input Creator__input--name"
          id="task-name"
          placeholder="What would be your next task?"
          onChange={(e) => {
            onTaskNameChange(e.target.value);
            onStateChange({ alertFlag: true })
          }}
          value={taskName}
        />
          
        {/* TASK TIME INPUT */}
        <input
          id="task-time"
          className="Creator__input Creator__input--task-time"
          placeholder="00m00s"
          maxLength="6"
          value={taskTimePlanned}
          onChange={(e) => {
            onTaskTimePlannedChange(e.target.value);
            onStateChange({ alertFlag: true })
          }}
        />
  
        {/* BREAK TIME INPUT */}
        <input
          id="break-time"
          className="Creator__input Creator__input--break-time"
          placeholder="00m00s"
          maxLength="6"
          value={breakTimePlanned}
          onChange={(e) => {
            onBreakTimePlannedChange(e.target.value);
            onStateChange({ alertFlag: true })
          }}
        />
        
        {/* ADD BUTTON */}
        <button
          className="Creator__button Creator__button--add"
          //disabled = {isTimerActive}
          onClick={() => onStartButtonClick()}
        >
          Add Task
        </button>
  
        {/* CANCEL BUTTON */}
        <button
          className="Creator__button Creator__button--cancel"
          //disabled = {isTimerActive}
          onClick={() => onStartButtonClick()}
        >
          Cancel
        </button>

        {/* TASK NAME LABEL */}
        <label className="Creator__label Creator__label--task-name" htmlFor="task-name">
          Your task
        </label>
        
        {/* TASK TIME LABEL */}
        <label className="Creator__label Creator__label--task-time" htmlFor="task-time">
          Task time
        </label>
        
        {/* BREAK TIME LABEL */}
        <label className="Creator__label Creator__label--break-time" htmlFor="break-time">
          Max break time
        </label>

        {/* ALERT */}
        <p className={`Creator__alert ${alertClassName}`}>
          You have to enter your task first!
        </p>
      </section>
    );
  }
}
export default Creator;