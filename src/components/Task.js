import React, { Component } from 'react';
import EditableText from './EditableText.js';
import EditableTime from './EditableTime.js';
//import Timer from './Timer.js';
//import StopTask from './StopTask.js';
//import Outro from './Outro.js';
//import Failure from './Failure.js';
import icons from '../assets/svg/icons.svg';
import '../scss/Task.scss';

class Task extends Component {
  constructor(props) {
    super(props);
    const {
      taskName,
      totalTaskTime,
      totalBreakTime,
      taskTimeArray,
      breakTimeArray,
    } = this.props.task;

    this.state = {
      taskName,
      taskMinutes: taskTimeArray[0],
      taskSeconds: taskTimeArray[1],
      breakMinutes: breakTimeArray[0],
      breakSeconds: breakTimeArray[1],
      totalTaskTime,
      totalBreakTime,
      taskTimeArray,
      breakTimeArray,
      isTaskNameEditMode: false,
      isTaskTimeEditMode: false,
      isBreakTimeEditMode: false,
      isTaskNameValid: true,
      isTaskTimeValid: true,
      isBreakTimeValid: true,
      //isElapsedMode: true,
      
      //taskTimeElapsed: 0,
      //taskTimeElapsedArray: ['00','00','00'],
      //taskTimeRemaining: 0,
      //taskTimeRemainingArray: ['00','00','00'],
      //isTaskTimeActive: false,

      //totalBreaks: 0,

      //break
      //isBreakTimeActive: false,
      //breakTimeElapsed: 0,
      //breakTimeElapsedArray: ['00','00','00'],
      //timer
      //previousTime: 0,
      //percentElapsed: 0,
      //percentRemaining: 100,
      //overallTime: 0,
      //overallTimeArray: ['00','00','00']

      //isTimerVisible: false,
      //isStopTaskVisible: false,
      //isOutroVisible: false,
      //isFailureVisible: false,
    }
  }
  
  handleStateChange = (object) => this.setState(object);

  handleTaskNameChange = (value) => {
    const { validateTaskName } = this.props;
    this.setState({
      taskName: value,
      isTaskNameValid: validateTaskName(value)
    });
  }

  handleTaskRemove = (id) => {
    const { onTaskRemove } = this.props;
    onTaskRemove(id);
  }

  /* handleStartButton = () => {
    const { isTaskTimePlannedValid, isBreakTimePlannedValid } = this.state;
    const breakTimeElapsedResult = this.handleTimeArray(0);

    if (isTaskTimePlannedValid && isBreakTimePlannedValid) {
      this.setState({
        isTimeVisible: false,
        isTimerVisible: true,
        isTaskTimeActive: true,
        previousTime: Date.now(),
        taskTimeElapsed: 0,
        breaksTotal: 0,
        breakTimeElapsed: 0,
        breakTimeElapsedArray: breakTimeElapsedResult,
        alertFlag: false
      });
    } else {
      this.setState({ alertFlag: true });
    }
  } */

  acceptEditChange = () => {
    const {
      taskTimeArray,
      breakTimeArray,
      isTaskNameValid,
      isTaskTimeValid,
      isBreakTimeValid
    } = this.state;
    const [ taskMinutes, taskSeconds ] = taskTimeArray;
    const [ breakMinutes, breakSeconds ] = breakTimeArray;

    if (isTaskNameValid && isTaskTimeValid && isBreakTimeValid) {
      this.setState({
        isTaskNameEditMode: false,
        isTaskTimeEditMode: false,
        isBreakTimeEditMode: false,
        taskMinutes,
        taskSeconds,
        breakMinutes,
        breakSeconds,
      });
    }
  }

  handleTimeChange = (minutes, seconds, units, type) => {
    const { onTimeChange } = this.props;
    const object = onTimeChange(minutes, seconds, units, type);
    console.log('object', object);

    if (type === 'task') {
      if (units === 'minutes') {
        const {
          taskMinutes, totalTaskTime, taskTimeArray, isTaskTimeValid
        } = object;
        this.setState({
          taskMinutes, totalTaskTime, taskTimeArray, isTaskTimeValid
        });
      } else if (units === 'seconds') {
        const {
          taskSeconds, totalTaskTime, taskTimeArray, isTaskTimeValid
        } = object;
        this.setState({
          taskSeconds, totalTaskTime, taskTimeArray, isTaskTimeValid
        });
      }
    } else if (type === 'break') {
      if (units === 'minutes') {
        const {
          breakMinutes, totalBreakTime, breakTimeArray, isBreakTimeValid
        } = object;
        this.setState({
          breakMinutes, totalBreakTime, breakTimeArray, isBreakTimeValid
        });
      } else if (units === 'seconds') {
        const {
          breakSeconds, totalBreakTime, breakTimeArray, isBreakTimeValid
        } = object;
        this.setState({
          breakSeconds, totalBreakTime, breakTimeArray, isBreakTimeValid
        });
      }
    }
    //this.setState({ alertTimeFlag });
  }

  render() {

    const { id } = this.props;
    const {
      taskName,
      taskMinutes,
      taskSeconds,
      breakMinutes,
      breakSeconds,
      isTaskNameEditMode,
      isTaskTimeEditMode,
      isBreakTimeEditMode,
      isTaskNameValid,
      isTaskTimeValid,
      isBreakTimeValid
    } = this.state;
    
    return (
      <section
        className="Task"
      >
        {/* TASK  NAME */}
        <EditableText
          className="taskName"
          output={taskName}
          isValid={isTaskNameValid}
          isEditMode={isTaskNameEditMode}
          onEditModeChange={() => this.setState({ isTaskNameEditMode: true })}
          onTaskNameChange={this.handleTaskNameChange}
        />

        {/* TOTAL TASK TIME */}
        <EditableTime
          block="totalTime"
          modifier="taskTime"
          minutes={taskMinutes}
          seconds={taskSeconds}
          isValid={isTaskTimeValid}
          onEditModeChange={() => this.setState({ isTaskTimeEditMode: true })}
          isEditMode={isTaskTimeEditMode}
          onMinutesChange={(value) => 
            this.handleTimeChange(value, taskSeconds, 'minutes', 'task')}
          onSecondsChange={(value) => 
            this.handleTimeChange(taskMinutes, value, 'seconds', 'task')}
        />
        
        {/* TOTAL BREAK TIME */}
        <EditableTime
          block="totalTime"
          modifier="breakTime"
          minutes={breakMinutes}
          seconds={breakSeconds}
          isValid={isBreakTimeValid}
          onEditModeChange={() => this.setState({ isBreakTimeEditMode: true })}
          isEditMode={isBreakTimeEditMode}
          onMinutesChange={(value) => 
            this.handleTimeChange(value, breakSeconds, 'minutes', 'break')}
          onSecondsChange={(value) => 
            this.handleTimeChange(breakMinutes, value, 'seconds', 'break')}
        />
                
        {/* EDIT BUTTONS */}
        <div className="Task__buttons">
          {/* ACCEPT */}
          <button
            className={`button Task__button Task__button--accept
            ${isTaskNameEditMode || isTaskTimeEditMode || isBreakTimeEditMode
            ? "Task__button--visible" : ""}`}
            onClick={this.acceptEditChange}
          >
            <svg className="Task__svg" viewBox="0 0 512 512">
              <use href={`${icons}#tick`}/>
            </svg>
          </button>
          {/* REMOVE */}
          <button
            className="button Task__button Task__button--remove"
            onClick={() => this.handleTaskRemove(id)}
          >
            <svg className="Task__svg" viewBox="0 0 512 512">
              <use href={`${icons}#remove`}/>
            </svg>
          </button>
        </div>

        {/* START BUTTON */}
        <button className="button Task__button Task__button--start">
          <svg className="Task__svg" viewBox="0 0 512 512">
            <use href={`${icons}#play`} />
          </svg>
        </button>
        
        {/* TIMER SECTION */}
        {/* <Timer
          compClassName={isTimerVisible
            ? "Timer--visible slideInRight" : "slideOutLeft"}
          onStateChange={this.handleStateChange}
          onDisplayModeChange={this.handleDisplayMode}
          onTimeArrayChange={this.handleTimeArray}
          state={this.state}
        /> */}
        {/* STOP TASK SECTION */}
        {/* <StopTask
          compClassName={`StopTask ${isStopTaskVisible
          ? "StopTask--visible" : ""}`}
          onStateChange={this.handleStateChange}
        /> */}
        {/* OUTRO SECTION */}
        {/* <Outro
          compClassName={`Outro ${isOutroVisible
          ? "Outro--visible slideInRight"
          : "slideOutLeft"}`}
          state={this.state}
          onStateChange={this.handleStateChange}
        /> */}
        {/* BREAK TIME EXCEEDED */}
        {/* <Failure
          compClassName={`Failure ${isFailureVisible
          ? "Failure--visible slideInRight"
          : "slideOutLeft"}`}
          state={this.state}
          onStateChange={this.handleStateChange}
        /> */}
      </section>
    );
  }
}
export default Task;