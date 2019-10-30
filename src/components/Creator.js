import React, { Component } from 'react';
//import icons from '../assets/svg/icons.svg';
import '../scss/Creator.scss';

class Creator extends Component {
  
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
        <h2 className="Creator__heading">Write your task</h2>
  
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
  
        {/* TASK NAME LABEL */}
        <label className="Creator__label Creator__label--name visuallyhidden" htmlFor="task-name">
          Your task
        </label>
        
        {/* ALERT */}
        <p className={`Creator__alert ${alertClassName}`}>
          You have to enter your task first!
        </p>
  
        {/* TASK TIME INPUT */}
        <input
          id="task-time"
          className="Time__input Time__input--task-time"
          placeholder="00m00s"
          maxLength="6"
          value={taskTimePlanned}
          onChange={(e) => {
            onTaskTimePlannedChange(e.target.value);
            onStateChange({ alertFlag: true })
          }}
        />
  
        {/* TASK TIME LABEL */}
        <label className="Time__label Time__label--task-time" htmlFor="task-time">
          Task time
        </label>
  
        {/* BREAK TIME INPUT */}
        <input
          id="break-time"
          className="Time__input Time__input--break-time"
          placeholder="00m00s"
          maxLength="6"
          value={breakTimePlanned}
          onChange={(e) => {
            onBreakTimePlannedChange(e.target.value);
            onStateChange({ alertFlag: true })
          }}
        />
  
        {/* BREAK TIME LABEL */}
        <label className="Time__label Time__label--break-time" htmlFor="break-time">
          Max break time
        </label>
  
        {/* START BUTTON */}
        <button
          className={`Time__start ${isTimerActive
            ? "Time__start--disabled" : ""}`}
          disabled = {isTimerActive}
          onClick={() => onStartButtonClick()}
        >
          Start
        </button>
      </section>
    );
  }
}
export default Creator;