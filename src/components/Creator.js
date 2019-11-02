import React, { Component } from 'react';
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
    };
  }

  handleTaskName = (e) => {
    const {value } = e.target;
    const { onTaskNameChange } = this.props;
    onTaskNameChange(value);
    this.setState({ creatorTaskName: value });
  }

  handlePlannedTaskTime = (e) => {
    const {value } = e.target;
    const { onPlannedTaskTimeChange } = this.props;
    onPlannedTaskTimeChange(value);
    this.setState({ creatorTaskTime: value });
  }
  
  handlePlannedBreakTime = (e) => {
    const {value } = e.target;
    const { onPlannedBreakTimeChange } = this.props;
    onPlannedBreakTimeChange(value);
    this.setState({ creatorBreakTime: value });
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
        <div className="Creator__taskTime">
          <input
            id="taskTime"
            name="taskTimeMinutes"
            className="Creator__input Creator__input--minutes"
            placeholder="min"
            maxLength="2"
            defaultValue={creatorTaskMinutes}
            onChange={(e) => this.handlePlannedTaskTime(e)}
          />
          <span>:</span>
          <input
            name="taskTimeSeconds"
            className="Creator__input Creator__input--seconds"
            placeholder="sec"
            maxLength="2"
            defaultValue={creatorTaskSeconds}
            onChange={(e) => this.handlePlannedTaskTime(e)}
          />
        </div>

        {/* BREAK TIME INPUTS */}
        <div className="Creator__breakTime">
          <input
            id="breakTime"
            name="breakTimeMinutes"
            className="Creator__input Creator__input--minutes"
            placeholder="min"
            maxLength="2"
            value={creatorBreakMinutes}
            onChange={(e) => this.handlePlannedBreakTime(e)}
          />
          <span>:</span>
          <input
            name="breakTimeSeconds"
            className="Creator__input Creator__input--minutes"
            placeholder="sec"
            maxLength="2"
            value={creatorBreakMinutes}
            onChange={(e) => this.handlePlannedBreakTime(e)}
          />
        </div>
        
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