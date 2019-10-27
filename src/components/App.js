import React, {Component} from 'react';
import Task from './Task.js';
import Time from './Time.js';
import Timer from './Timer.js';
import StopTask from './StopTask.js';
import Outro from './Outro.js';
import '../scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility
      isTaskVisible: false,
      isTimeVisible: true,
      isTimerVisible: true,
      isStopTaskVisible: false,
      isOutroVisible: false,
      isElapsedMode: true,
      // task
      taskName: null,
      isTaskNameValid: false,
      taskTimePlanned: null,
      isTaskTimePlannedValid: false,
      taskTimeTotal: 0,
      taskTimeElapsed: 0,
      taskTimeElapsedArray: ['00','00','00'],
      taskTimeRemaining: 0,
      taskTimeRemainingArray: ['00','00','00'],
      //timer
      previousTime: 0,
      isTaskTimeActive: false,
      // break
      breakTimePlanned: null,
      isBreakTimePlannedValid: true,
      isBreakTimeActive: false,
      breaksTotal: 0,
      breakTimeElapsed: 0,
      breakTimeElapsedArray: ['00','00','00'],
      // progress
      percentElapsed: 0,
      percentRemaining: 100,
      // outro
      overallTime: 0,
      overallTimeArray: ['00','00','00']
    }
  }

  handleTimeArray = (time) => {
    const makeTwoDigits = (number) => number < 10 ? `0${number}` : number;
    return [
      makeTwoDigits(Math.floor(time / 60000)),
      makeTwoDigits(Math.floor(time / 1000 % 60)),
      makeTwoDigits(Math.floor(time / 10 % 100))
    ]
  }

  handleTaskName = (name) => {
    this.setState({
      taskName: name,
      isTaskNameValid: name.length > 0 ? true : false 
    });
  }

  handleTaskTimePlanned = (time) => {
    const taskTimeTotal = this.handleTotalTime(time);
    const taskTimeRemainingArray = this.handleTimeArray(taskTimeTotal);
    this.setState({
      taskTimePlanned: time,
      isTaskTimePlannedValid: /(\d?\d[Mm])?(\d?\d[Ss])/.test(time),
      taskTimeTotal: taskTimeTotal,
      taskTimeRemaining: taskTimeTotal,
      taskTimeRemainingArray: taskTimeRemainingArray
    })
  }
  
  handleBreakTimePlanned = (time) => {
    this.setState({
      breakTimePlanned: time,
      isBreakTimePlannedValid: /^((\d?\d[Mm])?\d?\d[Ss]|)$/.test(time)
    })
  }

  handleTotalTime = (time) => {
    let totalTime = time.split(/[mM]/).map(a => parseInt(a) || 0);
    // if time format 00m is acceptable
    totalTime = totalTime.length > 1 ? totalTime : [0, ...totalTime];
    const [minutes, seconds] = totalTime;
    return minutes * 60000 + seconds * 1000;
  }

  handleStateChange = (object) => this.setState(object);

  handleDisplayMode = () => this.setState(prevState => ({
    isElapsedMode: !prevState.isElapsedMode
  }));

  render() {
    const {
      // visibility
      isTaskVisible,
      isTimeVisible,
      isTimerVisible,
      isStopTaskVisible,
      isOutroVisible,
      // task
      taskName,
      isTaskNameValid,
      taskTimePlanned,
      isTaskTimePlannedValid,
      // break
      breakTimePlanned,
      isBreakTimePlannedValid,
      // timer
      isTaskTimeActive
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__heading visuallyhidden">Task Timer App</h1>

        <Task
          compClassName={isTaskVisible
            ? "Task--visible slideInLeft"
            : "slideOutLeft"}
          alertClassName={taskName === ""
            ? "Task__alert--visible"
            : ""}
          changeState={this.handleStateChange}
          changeTaskName={this.handleTaskName}
          taskNameValidity={isTaskNameValid}
        />

        <Time
          compClassName={isTimeVisible
            ? "Time--visible slideInRight"
            //: isTimerVisible ? "slideOutLeft" : "slideOutRight"} // ! FOR TESTS
            : "Time--visible"}
          alertClassName={
            (!isTaskTimePlannedValid && taskTimePlanned != null)
            || (!isBreakTimePlannedValid && breakTimePlanned != null)
            ? "Time__alert--visible"
            : ""}
          breakTimePlanned={this.handleBreakTimePlanned}
          breakTimePlannedValidity={isBreakTimePlannedValid}
          changeState={this.handleStateChange}
          handleStartButton={this.handleStartButton}
          isTimerActive={isTaskTimeActive}
          taskTimePlanned={this.handleTaskTimePlanned}
          taskTimePlannedValidity={isTaskTimePlannedValid}
          handleTimeArray={this.handleTimeArray}
        />

        <Timer
          compClassName={isTimerVisible
            ? "Timer--visible slideInRight"
            : ""}
          changeDisplayMode={this.handleDisplayMode}
          changeState={this.handleStateChange}
          handleTimeArray={this.handleTimeArray}
          state={this.state}
        />

        <StopTask
          compClassName={`StopTask ${isStopTaskVisible
          ? "StopTask--visible" : ""}`}
          changeState={this.handleStateChange}
        />

        <Outro
          compClassName={`Outro ${isOutroVisible
          ? "Outro--visible" : ""}`}
          state={this.state}
        />
      </div>
    );
  }
}
export default App;