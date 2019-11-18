import React, { Component } from 'react';
import classNames from 'classnames';
import NewTaskInput from './NewTaskInput';
import { validateTaskName, handleTimeChange } from '../lib/handlers';
import icons from '../assets/svg/icons.svg';
import '../scss/Creator.scss';

class Creator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility
      isTaskNameVisible: true,
      isTaskTimeVisible: false,
      isBreakTimeVisible: false,
      // inputs
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
      isBreakTimeValid: true
    };
  }

  handleStateChange = (object) => this.setState(object);

  handleTaskName = (value) => {
    this.setState({
      creatorTaskName: value,
      isTaskNameValid: validateTaskName(value)
    });
  }
 
  handleCancelButton = (e) => {
    e.preventDefault();
    const { onStateChange } = this.props;
    // return to Board component
    onStateChange({ isCreatorVisible: false });
  }

  addNewTask = () => {
    const { onAppStateChange } = this.props;
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
        totalTaskTimeArray: creatorTaskTimeArray,
        totalBreakTimeArray: creatorBreakTimeArray,
        dateCreated: date,
        id: date
      };
      // add new task to app state
      onAppStateChange(prevState => ({
        isCreatorVisible: false,
        tasks: [...prevState.tasks, newTask]
      }));
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
    const newTime = handleTimeChange(minutes, seconds, units, type);

    if (type === 'task') {
      if (units === 'minutes') {
        const { taskMinutes, totalTaskTime, totalTaskTimeArray, isTaskTimeValid } = newTime;
        this.setState({
          creatorTaskMinutes: taskMinutes,
          creatorTotalTaskTime: totalTaskTime,
          creatorTaskTimeArray: totalTaskTimeArray,
          isTaskTimeValid
        });
      } else if (units === 'seconds') {
        const { taskSeconds, totalTaskTime, totalTaskTimeArray, isTaskTimeValid } = newTime;
        this.setState({
          creatorTaskSeconds: taskSeconds,
          creatorTotalTaskTime: totalTaskTime,
          creatorTaskTimeArray: totalTaskTimeArray,
          isTaskTimeValid
        });
      }
    } else if (type === 'break') {
      if (units === 'minutes') {
        const { breakMinutes, totalBreakTime, totalBreakTimeArray, isBreakTimeValid } = newTime;
        this.setState({
          creatorBreakMinutes: breakMinutes,
          creatorTotalBreakTime: totalBreakTime,
          creatorBreakTimeArray: totalBreakTimeArray,
          isBreakTimeValid
        });
      } else if (units === 'seconds') {
        const { breakSeconds, totalBreakTime, totalBreakTimeArray, isBreakTimeValid } = newTime;
        this.setState({
          creatorBreakSeconds: breakSeconds,
          creatorTotalBreakTime: totalBreakTime,
          creatorBreakTimeArray: totalBreakTimeArray,
          isBreakTimeValid
        });
      }
    }
  }

  handleBackButton = (e) => {
    e.preventDefault();
    const {
      isTaskNameVisible,
      isTaskTimeVisible,
      isBreakTimeVisible
    } = this.state;

    if (isTaskNameVisible) {
      this.setState({ isTaskNameVisible: false });
    }

    if (isTaskTimeVisible) {
      this.setState({
        isTaskNameVisible: true,
        isTaskTimeVisible: false
      });
    }

    if (isBreakTimeVisible) {
      this.setState({
        isTaskTimeVisible: true,
        isBreakTimeVisible: false
      });
    }
  }
  
  handleNextButton = (e) => {
    e.preventDefault();
    const {
      isTaskNameVisible,
      isTaskTimeVisible,
      isBreakTimeVisible,
      isTaskNameValid,
      isTaskTimeValid,
      isBreakTimeValid
    } = this.state;

    if (isTaskNameVisible && isTaskNameValid) {
      this.setState({
        isTaskNameVisible: false,
        isTaskTimeVisible: true
      });
    }

    if (isTaskTimeVisible && isTaskTimeValid) {
      this.setState({
        isTaskTimeVisible: false,
        isBreakTimeVisible: true
      });
    }

    if (isBreakTimeVisible && isBreakTimeValid) {
      this.setState({ isBreakTimeVisible: false });
      this.addNewTask();
    }
  }

  handleCreatorClose = (e) => {
    e.preventDefault();
    const { onAppStateChange } = this.props;
    onAppStateChange({ isCreatorVisible: false });
  }

  render() {

    const { isVisible } = this.props;

    const {
      // visibility
      isTaskNameVisible,
      isTaskTimeVisible,
      isBreakTimeVisible,
      // inputs
      creatorTaskName,
      creatorTaskMinutes,
      creatorTaskSeconds,
      creatorBreakMinutes,
      creatorBreakSeconds,
      // validation
      isTaskNameValid,
      isTaskTimeValid,
      isBreakTimeValid
    } = this.state;

    const isNextButtonVisible = 
    (isTaskNameVisible && isTaskNameValid) ||
    (isTaskTimeVisible && isTaskTimeValid) ||
    (isBreakTimeVisible && isBreakTimeValid);
  

    const backButtonClass = classNames("Creator__button",
      "Creator__button--back", {
      "Creator__button--visible": !isTaskNameVisible
    });
    
    const nextButtonClass = classNames("Creator__button",
      "Creator__button--next", {
      "Creator__button--visible": isNextButtonVisible
    });

    return (
      <form
        className="Creator"
        //onSubmit={this.handleFormSubmit}
        //onKeyDown={(e) => this.handleKeyboard(e)}
      >
        {/* TASK NAME INPUT */}
        <NewTaskInput
          isVisible={isTaskNameVisible}
          isValid={isTaskNameValid}
          modifier="taskName"
          title={creatorTaskName}
          label="Enter task name"
          placeholder="What would be your next task?"
          onTaskNameChange={this.handleTaskName}
        />

        {/* TASK TIME INPUT */}
        <NewTaskInput
          isVisible={isTaskTimeVisible}
          isValid={isTaskTimeValid}
          modifier="taskTime"
          label="Enter task time"
          placeholder="Enter time here..."
          minutes={creatorTaskMinutes}
          seconds={creatorTaskSeconds}
          onMinutesChange={(value) =>
            this.handleTimeChange(value, creatorTaskSeconds, 'minutes', 'task')}
          onSecondsChange={(value) =>
            this.handleTimeChange(creatorTaskMinutes, value, 'seconds', 'task')}
        />
        
        {/* BREAK TIME INPUT */}
        <NewTaskInput
          isVisible={isBreakTimeVisible}
          isValid={isBreakTimeValid}
          modifier="breakTime"
          label="Enter max break time"
          placeholder="Enter time here..."
          minutes={creatorBreakMinutes}
          seconds={creatorBreakSeconds}
          onMinutesChange={(value) =>
            this.handleTimeChange(value, creatorBreakSeconds, 'minutes', 'break')}
          onSecondsChange={(value) =>
            this.handleTimeChange(creatorBreakMinutes, value, 'seconds', 'break')}
        />

        {/* GO BACK BUTTON */}
        <button
          className={backButtonClass}
          onClick={this.handleBackButton}
        >
          <svg className="NewTaskInput__svg" viewBox="0 0 512 512">
            <use href={`${icons}#arrow-left`}></use>
          </svg>
        </button>
  
        {/* GO NEXT BUTTON */}
        <button
          className={nextButtonClass}
          onClick={this.handleNextButton}
        >
          <svg className="NewTaskInput__svg" viewBox="0 0 512 512">
            <use href={`${icons}#arrow-right`}></use>
          </svg>
        </button>

        {/* CLOSE NEW TASK */}
        <button
          className="Creator__closeButton"
          onClick={this.handleCreatorClose}
        >
          <svg className="Creator__svg" viewBox="0 0 512 512">
            <use href={`${icons}#remove`}/>
          </svg>
        </button>
      </form>
    );
  }
}
export default Creator;