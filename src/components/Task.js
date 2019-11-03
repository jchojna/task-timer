import React, { Component } from 'react';
import Display from './Display.js';
import EditableText from './EditableText.js';
import EditableDisplay from './EditableDisplay.js';
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
      taskMinutes,
      taskSeconds,
      breakMinutes,
      breakSeconds,
      totalTaskTime,
      totalBreakTime
    } = this.props.task;

    this.state = {
      taskName,
      totalTaskTime,
      totalBreakTime,
      taskMinutes,
      taskSeconds,
      breakMinutes,
      breakSeconds,
      isTaskNameEditMode: false,
      isTaskTimeEditMode: false,
      isBreakTimeEditMode: false,
      isTimeInputValid: true
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

  disableEditMode = () => {
    this.setState({
      isTaskNameEditMode: false,
      isTaskTimeEditMode: false,
      isBreakTimeEditMode: false
    });
  }

  handleTaskNameEdit = (value) => this.setState({ taskName: value });

  handleTimeChange = (minutes, seconds, units, type) => {
    const { onTimeChange } = this.props;
    const object = onTimeChange(minutes, seconds, units, type);
    //const { alertTimeFlag } = object;

    if (type === 'task') {
      if (units === 'minutes') {
        const { taskMinutes, totalTaskTime, isTimeInputValid } = object;
        this.setState({
          taskMinutes,
          totalTaskTime,
          isTimeInputValid
        });
      } else if (units === 'seconds') {
        const { taskSeconds, totalTaskTime, isTimeInputValid } = object;
        this.setState({
          taskSeconds,
          totalTaskTime,
          isTimeInputValid
        });
      }
    } else if (type === 'break') {
      if (units === 'minutes') {
        const { breakMinutes, totalBreakTime } = object;
        this.setState({
          breakMinutes,
          totalBreakTime
        });
      } else if (units === 'seconds') {
        const { breakSeconds, totalBreakTime } = object;
        this.setState({
          breakSeconds,
          totalBreakTime
        });
      }
    }
    //this.setState({ alertTimeFlag });
  }

  render() {

    const { handleTimeArray, id } = this.props;
    const {
      taskName,
      taskMinutes,
      taskSeconds,
      breakMinutes,
      breakSeconds,
      isTaskNameEditMode,
      isTaskTimeEditMode,
      isBreakTimeEditMode
    } = this.state;

    return (
      <section
        className="Task"
      >
        {/* TASK  NAME */}
        <EditableText
          className="taskName"
          output={taskName}
          onEditModeChange={() => this.setState({ isTaskNameEditMode: true })}
          onTaskEdit={this.handleTaskNameEdit}
          isEditMode={isTaskNameEditMode}
        />

        {/* TOTAL TASK TIME */}
        <EditableDisplay
          block="totalTime"
          modifier="taskTime"
          minutes={taskMinutes}
          seconds={taskSeconds}
          onEditModeChange={() => this.setState({ isTaskTimeEditMode: true })}
          isEditMode={isTaskTimeEditMode}
          onMinutesChange={(value) => 
            this.handleTimeChange(value, taskSeconds, 'minutes', 'task')}
          onSecondsChange={(value) => 
            this.handleTimeChange(taskMinutes, value, 'seconds', 'task')}
        />
        
        {/* TOTAL BREAK TIME */}
        <EditableDisplay
          block="totalTime"
          modifier="breakTime"
          minutes={breakMinutes}
          seconds={breakSeconds}
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
            onClick={this.disableEditMode}
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
      </section>
    );
  }
}
export default Task;