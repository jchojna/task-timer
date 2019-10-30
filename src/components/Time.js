import React, { Component } from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Task&Time.scss';

class Time extends Component {

  handlePreviousView = (e) => {
    const { onStateChange } = this.props;
    const keyPressed = e.key || null;

    if (keyPressed === "Escape" || keyPressed === null) {
      onStateChange({
        isTaskVisible: true,
        isTimeVisible: false,
        isTaskNameChangeActive: true
      })
    }
  }

  render() {
    const {
      compClassName,
      alertClassName,
      onStateChange,
      taskTimePlanned,
      breakTimePlanned,
      onTaskTimePlannedChange,
      onBreakTimePlannedChange,
      isTimerActive,
      onStartButtonClick
    } = this.props;

    return (
      <section
        className={`Time ${compClassName}`}
        tabIndex="0"
        autoFocus
        onKeyDown={(e) => this.handlePreviousView(e)}
      >
        <h2 className="Time__heading">Estimate a time</h2>
        {/* LEFT BUTTON */}
        <button
          className="Time__button Time__button--left"
          onClick={this.handlePreviousView}
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
        {/* ALERT */}
        <p className={`Time__alert ${alertClassName}`}>
          Enter time in a correct format (00m00s)
        </p>
      </section>
    );
  }
}
export default Time;