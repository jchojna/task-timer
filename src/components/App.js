import React, {Component} from 'react';
import Board from './Board.js';
import Creator from './Creator.js';
import '../scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility
      isBoardVisible: true,
      isCreatorVisible: true,
      tasks: [
        {
          taskName: "Test task for preview purposes",
          plannedTaskTime: "30s",
          plannedBreakTime: "10s",
          totalTaskTime: 30000,
          totalBreakTime: 10000,
          id: 6453654365346,
          dateCreated: 6453654365346
        },
        {
          taskName: "Another task for testing",
          plannedTaskTime: "60s",
          plannedBreakTime: "20s",
          totalTaskTime: 60000,
          totalBreakTime: 20000,
          id: 543254234523,
          dateCreated: 543254234523
        },
      ],
      // validity
      isTaskNameValid: false,
      isTimeInputValid: false
    };
  }

  handleStateChange = (object) => this.setState(object);
  handleTaskNameValidition = (name) => name.length > 0 ? true : false;
  handleTimeInputValidition = (time, total) => /^\d*$/.test(time) && total > 0;

  handleTotalTime = (minutes, seconds) => {
    minutes = !minutes ? 0 : parseInt(minutes);
    seconds = !seconds ? 0 : parseInt(seconds);
    return (minutes * 60000) + (seconds * 1000);
  }

  handleMinutesChange = (minutes, seconds, type) => {
    const totalTaskTime = this.handleTotalTime(minutes, seconds);
    const totalBreakTime = this.handleTotalTime(minutes, seconds);

    return type === 'task'
    ? {
      taskMinutes: minutes,
      totalTaskTime,
      isTimeInputValid: this.handleTimeInputValidition(minutes, totalTaskTime),
      alertTimeFlag: true
    } : {
      breakMinutes: minutes,
      totalBreakTime: totalBreakTime,
      alertTimeFlag: true
    };
  }
 
  handleSecondsChange = (minutes, seconds, type)  => {
    const totalTaskTime = this.handleTotalTime(minutes, seconds);
    const totalBreakTime = this.handleTotalTime(minutes, seconds);

    return type === 'task'
    ? {
      taskSeconds: seconds,
      totalTaskTime,
      isTimeInputValid: this.handleTimeInputValidition(seconds, totalTaskTime),
      alertTimeFlag: true
    } : {
      breakSeconds: seconds,
      totalBreakTime: totalBreakTime,
      alertTimeFlag: true
    };
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

  handleTaskRemove = (id) => {
    console.log(id);
    this.setState(prevState => ({
      tasks: prevState.tasks.filter(task => task.id !== id)
    }))
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
          onTaskRemove={this.handleTaskRemove}
        />

        {/* TASK CREATOR */}
        <Creator
          compClassName={isCreatorVisible
            ? "Creator--visible slideInRight" : "slideOutLeft"}
          onStateChange={this.handleStateChange}
          onMinutesChange={this.handleMinutesChange}
          onSecondsChange={this.handleSecondsChange}
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