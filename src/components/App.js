import React, {Component} from 'react';
import Board from './Board.js';
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
      isBoardVisible: true,
      isCreatorVisible: false,
      //isTimerVisible: false,
      //isStopTaskVisible: false,
      //isOutroVisible: false,
      //isFailureVisible: false,
      //isElapsedMode: true,
      alertNameFlag: false,
      alertTimeFlag: false,
      // task
      tasks: [],
      // validity
      isTaskNameValid: false,
      isPlannedTaskTimeValid: false,
      isPlannedBreakTimeValid: false,
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
    };
  }

  handleStateChange = (object) => this.setState(object);
  
  handleTaskNameValidition = (name) => {
    this.setState({
      isTaskNameValid: name.length > 0 ? true : false,
      alertNameFlag: true
    });
  }

  handlePlannedTaskTimeValidition = (time) => {
    const totalTaskTime = this.handleTotalTime(time);

    this.setState({
      isPlannedTaskTimeValid:
        /^(\d?\d[Mm])?(\d?\d[Ss])$/.test(time) && totalTaskTime > 0,
      alertTimeFlag: true
    })
  }

  handlePlannedBreakTimeValidition = (time) => {
    const totalBreakTime = this.handleTotalTime(time);
    
    this.setState({
      isPlannedBreakTimeValid:
      /^(\d?\d[Mm])?(\d?\d[Ss])$/.test(time) && totalBreakTime > 0,
      alertTimeFlag: true
    })
  }

  handleTotalTime = (time) => {
    let totalTime = time.split(/[mM]/).map(a => parseInt(a) || 0);
    // if time format 00m is acceptable
    totalTime = totalTime.length > 1 ? totalTime : [0, ...totalTime];
    const [minutes, seconds] = totalTime;
    return minutes * 60000 + seconds * 1000;
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

  handleAlertVisibility = (alert) => {
    const {
      alertNameFlag,
      alertTimeFlag,
      isTaskNameValid,
      isPlannedTaskTimeValid,
      isPlannedBreakTimeValid
    } = this.state;

    switch (alert) {
      case 'name':
        return alertNameFlag && !isTaskNameValid ? "Creator__alert--visible" : "";

      case 'time':
        return (alertTimeFlag && !isPlannedTaskTimeValid)
        || (alertTimeFlag && !isPlannedBreakTimeValid)
        ? "Creator__alert--visible" : "";

      default: break;
    }
  }

  render() {
    const { isCreatorVisible } = this.state;

    return (
      <div className="App">
        {/* APP HEADING */}
        <h1 className="App__heading visuallyhidden">Task Timer App</h1>

        {/* BOARD OF TASKS */}
        <Board
          state={this.state}
          onStateChange={this.handleStateChange}
          handleTotalTime={this.handleTotalTime}
          handleTimeArray={this.handleTimeArray}
        />

        {/* TASK CREATOR */}
        <Creator
          compClassName={isCreatorVisible
            ? "Creator--visible slideInRight" : "slideOutLeft"}
          nameAlertClassName={this.handleAlertVisibility('name')}
          timeAlertClassName={this.handleAlertVisibility('time')}
          state={this.state}
          handleTotalTime={this.handleTotalTime}
          onStateChange={this.handleStateChange}
          onTaskNameChange={this.handleTaskNameValidition}
          onPlannedTaskTimeChange={this.handlePlannedTaskTimeValidition}
          onPlannedBreakTimeChange={this.handlePlannedBreakTimeValidition}
        />
        
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
      </div>
    );
  }
}
export default App;