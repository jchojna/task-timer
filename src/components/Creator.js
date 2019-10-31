import React, { Component } from 'react';
//import icons from '../assets/svg/icons.svg';
import '../scss/Creator.scss';

class Creator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creatorTaskName: "",
      creatorTaskTime: "",
      creatorBreakTime: ""
    };
  }

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
    const { onStateChange } = this.props;
    const { creatorTaskName, creatorTaskTime, creatorBreakTime } = this.state;
    const {
      isTaskNameValid,
      isPlannedTaskTimeValid,
      isPlannedBreakTimeValid
    } = this.props.state;
    // validation
    if (isTaskNameValid && isPlannedTaskTimeValid && isPlannedBreakTimeValid) {
      const newTask = {
        taskName: creatorTaskName,
        plannedTaskTime: creatorTaskTime,
        plannedBreakTime: creatorBreakTime
      };
      onStateChange(prevState => ({
        isCreatorVisible: false,
        tasks: [...prevState.tasks, newTask]
      }));
      this.setState({
        creatorTaskName: "",
        creatorTaskTime: "",
        creatorBreakTime: ""
      })
    }
  }

  render() {

    const {
      creatorTaskName,
      creatorTaskTime,
      creatorBreakTime
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
          id="task-name"
          name="task-name"
          className="Creator__input Creator__input--name"
          placeholder="What would be your next task?"
          value={creatorTaskName}
          onChange={(e) => this.handleTaskName(e)}
        />
          
        {/* TASK TIME INPUT */}
        <input
          id="task-time"
          name="task-time"
          className="Creator__input Creator__input--task-time"
          placeholder="00m00s"
          maxLength="6"
          value={creatorTaskTime}
          onChange={(e) => this.handlePlannedTaskTime(e)}
        />
        {/* BREAK TIME INPUT */}
        <input
          id="break-time"
          name="break-time"
          className="Creator__input Creator__input--break-time"
          placeholder="00m00s"
          maxLength="6"
          value={creatorBreakTime}
          onChange={(e) => this.handlePlannedBreakTime(e)}
        />
        
        {/* ADD BUTTON */}
        <button
          type="submit"
          className="Creator__button Creator__button--add"
          //disabled = {isTimerActive}
          //onClick={this.handleAddButton}
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
        <label className="Creator__label Creator__label--task-name" htmlFor="task-name">
          Your task name
        </label>
        {/* TASK TIME LABEL */}
        <label className="Creator__label Creator__label--task-time" htmlFor="task-time">
          Task time
        </label>
        {/* BREAK TIME LABEL */}
        <label className="Creator__label Creator__label--break-time" htmlFor="break-time">
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