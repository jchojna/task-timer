import React, { Component } from 'react';
import TimeDisplay from './TimeDisplay.js';
//import icons from '../assets/svg/icons.svg';
import '../scss/Creator.scss';

class Creator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatorTaskName: "",
      creatorTaskMinutes: "",
      creatorTaskSeconds: "",
      creatorBreakMinutes: "",
      creatorBreakSeconds: "",
      creatorTotalTaskTime: 0,
      creatorTotalBreakTime: 0,
      isTimeInputValid: false
    };
  }

  handleTaskName = (e) => {
    const {value } = e.target;
    const { validateTaskName } = this.props;
    validateTaskName(value);
    this.setState({ creatorTaskName: value });
  }

  handleTotalTime = (minutes, seconds) => {
    minutes = !minutes ? 0 : parseInt(minutes);
    seconds = !seconds ? 0 : parseInt(seconds);
    return (minutes * 60000) + (seconds * 1000);
  }

  handleMinutesChange = (value, type) => {
    const { creatorTaskSeconds, creatorBreakSeconds } = this.state;
    const totalTaskTime = this.handleTotalTime(value, creatorTaskSeconds);
    const totalBreakTime = this.handleTotalTime(value, creatorBreakSeconds);

    this.setState( type === 'task'
    ? {
      creatorTaskMinutes: value,
      creatorTotalTaskTime: totalTaskTime,
      isTimeInputValid: (/^\d*$/.test(value) && totalTaskTime > 0),
    } : {
      creatorBreakMinutes: value,
      creatorTotalBreakTime: totalBreakTime
    });
  }
 
  handleSecondsChange = (value, type) => {
    const { creatorTaskMinutes, creatorBreakMinutes } = this.state;
    const totalTaskTime = this.handleTotalTime(creatorTaskMinutes, value);
    const totalBreakTime = this.handleTotalTime(creatorBreakMinutes, value);

    this.setState( type === 'task'
    ? {
      creatorTaskSeconds: value,
      creatorTotalTaskTime: totalTaskTime,
      isTimeInputValid: (/^\d*$/.test(value) && totalTaskTime > 0),
    } : {
      creatorBreakSeconds: value,
      creatorTotalBreakTime: totalBreakTime
    });
  }
 
  handleCancelButton = (e) => {
    e.preventDefault();
    const { onStateChange } = this.props;
    // return to Board component
    onStateChange({
      isCreatorVisible: false
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { onStateChange, handleTotalTime } = this.props;
    const { creatorTaskName, creatorTaskTime, creatorBreakTime } = this.state;
    const {
      isTaskNameValid,
      isPlannedTaskTimeValid,
      isPlannedBreakTimeValid
    } = this.props.state;
    // validation
    if (isTaskNameValid && isPlannedTaskTimeValid && isPlannedBreakTimeValid) {
      
      const totalTaskTime = handleTotalTime(creatorTaskTime);
      const totalBreakTime = handleTotalTime(creatorBreakTime);
      const date = Date.now();
      // new task data
      const newTask = {
        taskName: creatorTaskName,
        plannedTaskTime: creatorTaskTime,
        plannedBreakTime: creatorBreakTime,
        totalTaskTime,
        totalBreakTime,
        dateCreated: date,
        id: date
      };
      // add new task to app state
      onStateChange(prevState => ({
        isCreatorVisible: false,
        tasks: [...prevState.tasks, newTask]
      }));
      // clear inputs after submitting
      this.setState({
        creatorTaskName: "",
        creatorTaskMinutes: "",
        creatorTaskSeconds: "",
        creatorBreakMinutes: "",
        creatorBreakSeconds: "",
      })
    }
  }

  /* handleKeyPress = (e) => {
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
      creatorTaskName,
      creatorTaskMinutes,
      creatorTaskSeconds,
      creatorBreakMinutes,
      creatorBreakSeconds
    } = this.state;

    const {
      compClassName,
      nameAlertClassName,
      timeAlertClassName
    } = this.props;

    return (
      <form
        className={`Creator ${compClassName}`}
        tabIndex="0"
        autoFocus
        onSubmit={this.handleFormSubmit}
        //onKeyDown={(e) => this.handleKeyboard(e)}
      >
        {/* TASK HEADING */}
        <h2 className="Creator__heading">Create a new task</h2>
  
        {/* TASK NAME INPUT */}
        <input
          id="taskName"
          name="taskName"
          className="Creator__taskName"
          placeholder="What would be your next task?"
          value={creatorTaskName}
          onChange={(e) => this.handleTaskName(e)}
        />
          
        {/* TASK TIME INPUTS */}
        <TimeDisplay
          modifier="taskTime"
          minutes={creatorTaskMinutes}
          seconds={creatorTaskSeconds}
          onMinutesChange={(value) => this.handleMinutesChange(value, 'task')}
          onSecondsChange={(value) => this.handleSecondsChange(value, 'task')}
        />

        {/* BREAK TIME INPUTS */}
        <TimeDisplay
          modifier="breakTime"
          minutes={creatorBreakMinutes}
          seconds={creatorBreakSeconds}
          onMinutesChange={(value) => this.handleMinutesChange(value, 'break')}
          onSecondsChange={(value) => this.handleSecondsChange(value, 'break')}
        />
        
        {/* ADD BUTTON */}
        <button
          type="submit"
          className="Creator__button Creator__button--add"
          //disabled = {isTimerActive}
        >
          Add Task
        </button>
        {/* CANCEL BUTTON */}
        <button
          className="Creator__button Creator__button--cancel"
          //disabled = {isTimerActive}
          onClick={this.handleCancelButton}
        >
          Cancel
        </button>

        {/* TASK NAME LABEL */}
        <label className="Creator__label Creator__label--task-name" htmlFor="taskName">
          Your task name
        </label>
        {/* TASK TIME LABEL */}
        <label className="Creator__label Creator__label--task-time" htmlFor="taskTime">
          Task time
        </label>
        {/* BREAK TIME LABEL */}
        <label className="Creator__label Creator__label--break-time" htmlFor="breakTime">
          Max break time
        </label>

        {/* ALERTS */}
        <div className="Creator__alerts">
          <p className={`Creator__alert ${nameAlertClassName}`}>
            You have to enter your task name!
          </p>
          <p className={`Creator__alert ${timeAlertClassName}`}>
            Enter time in specific format (00m00s)
          </p>
        </div>
      </form>
    );
  }
}
export default Creator;