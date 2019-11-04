import React, { Component } from 'react';
import TimeInputs from './TimeInputs.js';
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
      creatorTaskTimeArray: ["",""],
      creatorBreakTimeArray: ["",""],
      // validation
      isTaskNameValid: false,
      isTaskTimeValid: false,
      isBreakTimeValid: false,
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
      isTaskTimeValid,
      isBreakTimeValid
     } = this.state;

    switch (alert) {
      case 'name':
        return alertNameFlag && !isTaskNameValid
        ? "Creator__alert--visible" : "";

      case 'time':
        return alertTimeFlag && (!isTaskTimeValid || !isBreakTimeValid)
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
      creatorTaskMinutes,
      creatorTaskSeconds,
      creatorBreakMinutes,
      creatorBreakSeconds,
      creatorTotalTaskTime,
      creatorTotalBreakTime,
      creatorTaskTimeArray,
      creatorBreakTimeArray,
      isTaskNameValid,
      isTaskTimeValid
    } = this.state;

    this.setState({
      alertNameFlag: true,
      alertTimeFlag: true
    })    
    // validation
    if (isTaskNameValid && isTaskTimeValid) {
      const date = Date.now();
      // new task data
      const newTask = {
        taskName: creatorTaskName,
        taskMinutes: creatorTaskMinutes,
        taskSeconds: creatorTaskSeconds,
        breakMinutes: creatorBreakMinutes,
        breakSeconds: creatorBreakSeconds,
        totalTaskTime: creatorTotalTaskTime,
        totalBreakTime: creatorTotalBreakTime,
        taskTimeArray: creatorTaskTimeArray,
        breakTimeArray: creatorBreakTimeArray,
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
    const { alertTimeFlag } = object;

    if (type === 'task') {
      if (units === 'minutes') {
        const { taskMinutes, totalTaskTime, taskTimeArray, isTaskTimeValid } = object;
        this.setState({
          creatorTaskMinutes: taskMinutes,
          creatorTotalTaskTime: totalTaskTime,
          creatorTaskTimeArray: taskTimeArray,
          isTaskTimeValid
        });
      } else if (units === 'seconds') {
        const { taskSeconds, totalTaskTime, taskTimeArray, isTaskTimeValid } = object;
        this.setState({
          creatorTaskSeconds: taskSeconds,
          creatorTotalTaskTime: totalTaskTime,
          creatorTaskTimeArray: taskTimeArray,
          isTaskTimeValid
        });
      }
    } else if (type === 'break') {
      if (units === 'minutes') {
        const { breakMinutes, totalBreakTime, breakTimeArray, isBreakTimeValid } = object;
        this.setState({
          creatorBreakMinutes: breakMinutes,
          creatorTotalBreakTime: totalBreakTime,
          creatorBreakTimeArray: breakTimeArray,
          isBreakTimeValid
        });
      } else if (units === 'seconds') {
        const { breakSeconds, totalBreakTime, breakTimeArray, isBreakTimeValid } = object;
        this.setState({
          creatorBreakSeconds: breakSeconds,
          creatorTotalBreakTime: totalBreakTime,
          creatorBreakTimeArray: breakTimeArray,
          isBreakTimeValid
        });
      }
    }
    this.setState({ alertTimeFlag });
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
        <TimeInputs
          block="Creator"
          modifier="taskTime"
          minutes={creatorTaskMinutes}
          seconds={creatorTaskSeconds}
          onMinutesChange={(value) =>
            this.handleTimeChange(value, creatorTaskSeconds, 'minutes', 'task')}
          onSecondsChange={(value) =>
            this.handleTimeChange(creatorTaskMinutes, value, 'seconds', 'task')}
        />

        {/* BREAK TIME INPUTS */}
        <TimeInputs
          block="Creator"
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