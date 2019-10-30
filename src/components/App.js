import React, {Component} from 'react';
import Creator from './Creator.js';
import Timer from './Timer.js';
import StopTask from './StopTask.js';
import Outro from './Outro.js';
import Failure from './Failure.js';
import '../scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility
      isTaskVisible: true,
      isTimeVisible: false,
      isTimerVisible: false,
      isStopTaskVisible: false,
      isOutroVisible: false,
      isFailureVisible: false,
      isElapsedMode: true,
      isTaskNameChangeActive: false,
      nameAlertFlag: false,
      timeAlertFlag: false,
      // task
      taskName: "",
      isTaskNameValid: false,
      taskTimePlanned: "",
      isTaskTimePlannedValid: false,
      taskTimeTotal: 0,
      taskTimeElapsed: 0,
      taskTimeElapsedArray: ['00','00','00'],
      taskTimeRemaining: 0,
      taskTimeRemainingArray: ['00','00','00'],
      isTaskTimeActive: false,
      //break
      isBreakTimePlannedValid: true,
      isBreakTimeActive: false,
      breaksTotal: 0,
      breakTimePlanned: "",
      breakTimeTotal: 0,
      breakTimeElapsed: 0,
      breakTimeElapsedArray: ['00','00','00'],
      //timer
      previousTime: 0,
      percentElapsed: 0,
      percentRemaining: 100,
      overallTime: 0,
      overallTimeArray: ['00','00','00']
    }
  }

  handleStateChange = (object) => this.setState(object);

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
      isTaskTimePlannedValid:
        /(\d?\d[Mm])?(\d?\d[Ss])/.test(time) && taskTimeTotal > 0,
      taskTimeTotal: taskTimeTotal,
      taskTimeRemaining: taskTimeTotal,
      taskTimeRemainingArray: taskTimeRemainingArray
    })
  }
  
  handleBreakTimePlanned = (time) => {
    const breakTimeTotal = this.handleTotalTime(time);
    
    this.setState({
      breakTimePlanned: time,
      isBreakTimePlannedValid:
      /(\d?\d[Mm])?(\d?\d[Ss])/.test(time) && breakTimeTotal > 0,
      breakTimeTotal: breakTimeTotal
    })
  }

  handleTotalTime = (time) => {
    let totalTime = time.split(/[mM]/).map(a => parseInt(a) || 0);
    // if time format 00m is acceptable
    totalTime = totalTime.length > 1 ? totalTime : [0, ...totalTime];
    const [minutes, seconds] = totalTime;
    return minutes * 60000 + seconds * 1000;
  }

  handleStartButton = () => {
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
  }

  handleDisplayMode = () => this.setState(prevState => ({
    isElapsedMode: !prevState.isElapsedMode
  }));

  handleTimeArray = (time) => {
    const makeTwoDigits = (number) => number < 10 ? `0${number}` : number;
    return [
      makeTwoDigits(Math.floor(time / 60000)),
      makeTwoDigits(Math.floor(time / 1000 % 60)),
      makeTwoDigits(Math.floor(time / 10 % 100))
    ]
  }

  render() {
    const {
      isTaskVisible,
      isTimerVisible,
      isStopTaskVisible,
      isOutroVisible,
      isFailureVisible,
      nameAlertFlag,
      timeAlertFlag,
      isTaskNameChangeActive,
      isTaskNameValid,
      isTaskTimePlannedValid,
      isBreakTimePlannedValid
    } = this.state;

    return (
      <div className="App">
        {/* APP HEADING */}
        <h1 className="App__heading visuallyhidden">Task Timer App</h1>

        {/* TASK CREATOR */}
        <Creator
          compClassName={isTaskVisible
            ? `Creator--visible ${isTaskNameChangeActive
              ? "slideInLeft" : "slideInRight"}`
            : "slideOutLeft"}
          nameAlertClassName={nameAlertFlag && !isTaskNameValid
            ? "Creator__alert--visible" : ""}
          timeAlertClassName={(timeAlertFlag && !isTaskTimePlannedValid)
            || (timeAlertFlag && !isBreakTimePlannedValid)
            ? "Creator__alert--visible" : ""}
          state={this.state}
          onStateChange={this.handleStateChange}
          onTaskNameChange={this.handleTaskName}
          onStartButtonClick={this.handleStartButton}
          onTaskTimePlannedChange={this.handleTaskTimePlanned}
          onBreakTimePlannedChange={this.handleBreakTimePlanned}
        />
        
        {/* TIMER SECTION */}
        <Timer
          compClassName={isTimerVisible
            ? "Timer--visible slideInRight" : "slideOutLeft"}
          onStateChange={this.handleStateChange}
          onDisplayModeChange={this.handleDisplayMode}
          onTimeArrayChange={this.handleTimeArray}
          state={this.state}
        />
        {/* STOP TASK SECTION */}
        <StopTask
          compClassName={`StopTask ${isStopTaskVisible
          ? "StopTask--visible" : ""}`}
          onStateChange={this.handleStateChange}
        />
        {/* OUTRO SECTION */}
        <Outro
          compClassName={`Outro ${isOutroVisible
          ? "Outro--visible slideInRight"
          : "slideOutLeft"}`}
          state={this.state}
          onStateChange={this.handleStateChange}
        />
        {/* BREAK TIME EXCEEDED */}
        <Failure
          compClassName={`Failure ${isFailureVisible
          ? "Failure--visible slideInRight"
          : "slideOutLeft"}`}
          state={this.state}
          onStateChange={this.handleStateChange}
        />
      </div>
    );
  }
}
export default App;