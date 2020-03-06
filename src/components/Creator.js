import React, { Component } from 'react';
import classNames from 'classnames';
import CreatorInput from './CreatorInput';
import { validateTaskName, handleTimeChange } from '../lib/handlers';
import { cardFlipTime, animationStyle } from '../lib/globalVariables';
import icons from '../assets/svg/icons.svg';
import '../scss/Creator.scss';

class Creator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility
      isCreatorRotatingOut: false,
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
      taskNameLength: 0,
      creatorTaskTimeArray: ["",""],
      creatorBreakTimeArray: ["",""],
      // validation
      isTaskNameValid: false,
      isTaskTimeValid: false,
      isBreakTimeValid: true,
      isCreatorValid: false,
      alertFlag: false,

      slideDirection: null
    };
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeoutOutroId);
  }

  handleStateChange = (object) => this.setState(object);

  handleTaskName = (value) => {
    this.setState({
      creatorTaskName: value,
      taskNameLength: value.length,
      isTaskNameValid: validateTaskName(value),
      alertFlag: true
    });
  }

  addNewTask = () => {
    const { onBoardStateChange, onTaskEdit } = this.props;
    const {
      creatorTaskName,
      creatorTaskMinutes,
      creatorTaskSeconds,
      creatorBreakMinutes,
      creatorBreakSeconds,
      creatorTotalTaskTime,
      creatorTotalBreakTime,
      creatorTaskTimeArray,
      creatorBreakTimeArray
    } = this.state;

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
    onBoardStateChange({ isCreatorVisible: false });
    onTaskEdit(newTask, 'add');
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
          isTaskTimeValid,
          alertFlag: true
        });
      } else if (units === 'seconds') {
        const { taskSeconds, totalTaskTime, totalTaskTimeArray, isTaskTimeValid } = newTime;
        this.setState({
          creatorTaskSeconds: taskSeconds,
          creatorTotalTaskTime: totalTaskTime,
          creatorTaskTimeArray: totalTaskTimeArray,
          isTaskTimeValid,
          alertFlag: true
        });
      }
    } else if (type === 'break') {
      if (units === 'minutes') {
        const { breakMinutes, totalBreakTime, totalBreakTimeArray, isBreakTimeValid } = newTime;
        this.setState({
          creatorBreakMinutes: breakMinutes,
          creatorTotalBreakTime: totalBreakTime,
          creatorBreakTimeArray: totalBreakTimeArray,
          isBreakTimeValid,
          alertFlag: true
        });
      } else if (units === 'seconds') {
        const { breakSeconds, totalBreakTime, totalBreakTimeArray, isBreakTimeValid } = newTime;
        this.setState({
          creatorBreakSeconds: breakSeconds,
          creatorTotalBreakTime: totalBreakTime,
          creatorBreakTimeArray: totalBreakTimeArray,
          isBreakTimeValid,
          alertFlag: true
        });
      }
    }
  }

  handleBackButton = (e) => {
    e.preventDefault();
    const {
      isTaskTimeVisible,
      isBreakTimeVisible
    } = this.state;

    if (isTaskTimeVisible) {
      this.setState({
        isTaskNameVisible: true,
        isTaskTimeVisible: false,
        slideDirection: "toLeft"
      });
    }

    if (isBreakTimeVisible) {
      this.setState({
        isTaskTimeVisible: true,
        isBreakTimeVisible: false,
        slideDirection: "toLeft"
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
        isTaskTimeVisible: true,
        alertFlag: false,
        slideDirection: "toRight"
      });
    }

    if (isTaskTimeVisible && isTaskTimeValid) {
      this.setState({
        isTaskTimeVisible: false,
        isBreakTimeVisible: true,
        alertFlag: false,
        slideDirection: "toRight"
      });
    }

    if (isBreakTimeVisible && isBreakTimeValid) {
      this.setState({
        isCreatorValid: true,
        alertFlag: false,
        isCreatorRotatingOut: true,
        slideDirection: "toRight"
      });
      this.timeoutOutroId = setTimeout(() => this.addNewTask(),
      cardFlipTime);
    }
  }

  handleCreatorClose = (e) => {
    e.preventDefault();
    const { onBoardStateChange } = this.props;
    onBoardStateChange({ isCreatorVisible: false });
  }

  render() {

    const {
      // visibility
      isCreatorRotatingOut,
      isTaskNameVisible,
      isTaskTimeVisible,
      isBreakTimeVisible,
      // inputs
      creatorTaskName,
      creatorTaskMinutes,
      creatorTaskSeconds,
      creatorBreakMinutes,
      creatorBreakSeconds,
      taskNameLength,
      // validation
      isTaskNameValid,
      isTaskTimeValid,
      isBreakTimeValid,
      isCreatorValid,
      alertFlag,
      
      slideDirection
    } = this.state;

    const isNextButtonVisible = 
    (isTaskNameVisible && isTaskNameValid) ||
    (isTaskTimeVisible && isTaskTimeValid) ||
    (isBreakTimeVisible && isBreakTimeValid);

    const creatorClass = classNames("Creator", {
      "Creator--rotateOut": isCreatorRotatingOut
    });
  
    const backButtonClass = classNames("Creator__button",
      "Creator__button--back", {
      "Creator__button--visible": !isTaskNameVisible
    });
    
    const nextButtonClass = classNames("Creator__button",
      "Creator__button--next", {
      "Creator__button--visible": isNextButtonVisible
    });
    
    const closeButtonClass = "Creator__button Creator__button--visible Creator__button--close";

    const progressBarLoadedStyle = {
      width: isTaskTimeVisible ? `${1/3 * 100}%`
      : isBreakTimeVisible ?
        isCreatorValid ? "100%" : `${2/3 * 100}%`
      : 0
    }

    return (
      <form
        className={creatorClass}
        style={animationStyle}
        //onSubmit={this.handleFormSubmit}
        //onKeyDown={(e) => this.handleKeyboard(e)}
      >
        {/* TASK NAME INPUT */}
        <CreatorInput
          isVisible={isTaskNameVisible}
          isValid={isTaskNameValid}
          modifier="taskName"
          title={creatorTaskName}
          label="Enter task name"
          placeholder="What would be your next task?"
          alertFlag={alertFlag}
          onTaskNameChange={this.handleTaskName}
          slideDirection={slideDirection}
          taskNameLength={taskNameLength}
        />

        {/* TASK TIME INPUT */}
        <CreatorInput
          isVisible={isTaskTimeVisible}
          isValid={isTaskTimeValid}
          modifier="taskTime"
          label="Enter task time"
          placeholder="Enter time here..."
          minutes={creatorTaskMinutes}
          seconds={creatorTaskSeconds}
          alertFlag={alertFlag}
          slideDirection={slideDirection}
          onMinutesChange={(value) =>
            this.handleTimeChange(value, creatorTaskSeconds, 'minutes', 'task')}
          onSecondsChange={(value) =>
            this.handleTimeChange(creatorTaskMinutes, value, 'seconds', 'task')}
        />
        
        {/* BREAK TIME INPUT */}
        <CreatorInput
          isVisible={isBreakTimeVisible}
          isValid={isBreakTimeValid}
          modifier="breakTime"
          label="Enter max break time"
          placeholder="Enter time here..."
          minutes={creatorBreakMinutes}
          seconds={creatorBreakSeconds}
          alertFlag={alertFlag}
          slideDirection={slideDirection}
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
          <svg className="Creator__svg" viewBox="0 0 512 512">
            <use href={`${icons}#arrow-left`}></use>
          </svg>
        </button>
  
        {/* GO NEXT BUTTON */}
        <button
          className={nextButtonClass}
          onClick={this.handleNextButton}
        >
          <svg className="Creator__svg" viewBox="0 0 512 512">
            <use href={`${icons}#arrow-right`}></use>
          </svg>
        </button>

        {/* CLOSE NEW TASK */}
        <button
          className={closeButtonClass}
          onClick={this.handleCreatorClose}
        >
          <svg className="Creator__svg" viewBox="0 0 512 512">
            <use href={`${icons}#remove`}/>
          </svg>
        </button>

        {/* PROGRESS BAR */}
        <div className="progressBar">
          <div
            className="progressBar__loaded"
            style={progressBarLoadedStyle}
          ></div>
        </div>
      </form>
    );
  }
}
export default Creator;