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
      // validation
      isTaskNameValid: false,
      isTimeInputValid: false,
      alertNameFlag: false,
      alertTimeFlag: false,
    };
  }

  handleTaskName = (e) => {
    const {value } = e.target;
    const { validateTaskName } = this.props;
    this.setState({
      creatorTaskName: value,
      isTaskNameValid: validateTaskName(value),
      alertNameFlag: true
    });
  }
  
  handleAlertVisibility = (alert) => {
    const {
      alertNameFlag,
      alertTimeFlag,
      isTaskNameValid,
      isTimeInputValid
     } = this.state;

    switch (alert) {
      case 'name':
        return alertNameFlag && !isTaskNameValid
        ? "Creator__alert--visible" : "";

      case 'time':
        return alertTimeFlag && !isTimeInputValid
        ? "Creator__alert--visible" : "";

      default: break;
    }
  }
 
  handleCancelButton = (e) => {
    e.preventDefault();
    const { onStateChange } = this.props;
    // return to Board component
    onStateChange({ isCreatorVisible: false });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { onStateChange } = this.props;
    const {
      creatorTaskName,
      creatorTotalTaskTime,
      creatorTotalBreakTime,
      isTaskNameValid,
      isTimeInputValid
    } = this.state;

    this.setState({
      alertNameFlag: true,
      alertTimeFlag: true
    })    
    // validation
    if (isTaskNameValid && isTimeInputValid) {
      const date = Date.now();
      // new task data
      const newTask = {
        taskName: creatorTaskName,
        totalTaskTime: creatorTotalTaskTime,
        totalBreakTime: creatorTotalBreakTime,
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
        creatorTotalTaskTime: 0,
        creatorTotalBreakTime: 0,
        isTaskNameValid: false,
        isTimeInputValid: false,
        alertNameFlag: false,
        alertTimeFlag: false,
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

  handleTimeChange = (minutes, seconds, units, type) => {
    const { onTimeChange } = this.props;
    const object = onTimeChange(minutes, seconds, units, type);

    if (type === 'task') {

      if (units === 'minutes') {
        const { taskMinutes, totalTaskTime, isTimeInputValid, alertTimeFlag } = object;
        this.setState({
          creatorTaskMinutes: taskMinutes,
          creatorTotalTaskTime: totalTaskTime,
          isTimeInputValid,
          alertTimeFlag
        });
      } else if (units === 'seconds') {
        const { taskSeconds, totalTaskTime, isTimeInputValid, alertTimeFlag } = object;
        this.setState({
          creatorTaskSeconds: taskSeconds,
          creatorTotalTaskTime: totalTaskTime,
          isTimeInputValid,
          alertTimeFlag
        });
      }
    } else if (type === 'break') {

      if (units === 'minutes') {
        const { breakMinutes, totalBreakTime, alertTimeFlag } = object;
        this.setState({
          creatorBreakMinutes: breakMinutes,
          creatorTotalBreakTime: totalBreakTime,
          alertTimeFlag
        });
      } else if (units === 'seconds') {
        const { breakSeconds, totalBreakTime, alertTimeFlag } = object;
        this.setState({
          creatorBreakSeconds: breakSeconds,
          creatorTotalBreakTime: totalBreakTime,
          alertTimeFlag
        });
      }
    }
    













  }



  render() {

    const {
      creatorTaskName,
      creatorTaskMinutes,
      creatorTaskSeconds,
      creatorBreakMinutes,
      creatorBreakSeconds
    } = this.state;

    const { compClassName } = this.props;

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
          block="Field"
          modifier="taskTime"
          minutes={creatorTaskMinutes}
          seconds={creatorTaskSeconds}
          onMinutesChange={(value) =>
            this.handleTimeChange(value, creatorTaskSeconds, 'minutes', 'task')}
          onSecondsChange={(value) =>
            this.handleTimeChange(creatorTaskMinutes, value, 'seconds', 'task')}
        />

        {/* BREAK TIME INPUTS */}
        <TimeDisplay
          block="Field"
          modifier="breakTime"
          minutes={creatorBreakMinutes}
          seconds={creatorBreakSeconds}
          onMinutesChange={(value) =>
            this.handleTimeChange(value, creatorBreakSeconds, 'minutes', 'break')}
          onSecondsChange={(value) =>
            this.handleTimeChange(creatorBreakMinutes, value, 'seconds', 'break')}
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
          <p className={`Creator__alert ${this.handleAlertVisibility('name')}`}>
            You have to enter your task name!
          </p>
          <p className={`Creator__alert ${this.handleAlertVisibility('time')}`}>
            Enter correct time for task!
          </p>
        </div>
      </form>
    );
  }
}
export default Creator;