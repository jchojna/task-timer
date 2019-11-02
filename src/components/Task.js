import React, { Component } from 'react';
import Display from './Display.js';
import Timer from './Timer.js';
import StopTask from './StopTask.js';
import Outro from './Outro.js';
import Failure from './Failure.js';
import icons from '../assets/svg/icons.svg';
import '../scss/Task.scss';

class Task extends Component {
  constructor(props) {
    super(props);
    const {totalTaskTime, totalBreakTime} = this.props.task;
    this.state = {
      totalTaskTime,
      totalBreakTime
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

  render() {

    const { taskName } = this.props.task;
    const { handleTimeArray, id } = this.props;
    const { totalTaskTime, totalBreakTime } = this.state;

    return (
      <section className="Task">
        {/* TASK  NAME */}
        <h2 className="Task__name">
          {`"${taskName}"`}
        </h2>

        {/* TOTAL TASK TIME DISPLAY */}
        <Display
          className="Task__totalTime Task__totalTime--task"
          taskTimeArray={handleTimeArray(totalTaskTime)}
        />

        {/* TOTAL BREAK TIME DISPLAY */}
        <Display
          className="Task__totalTime Task__totalTime--break"
          taskTimeArray={handleTimeArray(totalBreakTime)}
        />
        
        {/* REMOVE BUTTON */}
        <button
          className="button Task__button Task__button--remove"
          onClick={() => this.handleTaskRemove(id)}
        >
          <svg className="Task__svg" viewBox="0 0 512 512">
            <use href={`${icons}#remove`}/>
          </svg>
        </button>
      </section>
    );
  }
}
export default Task;