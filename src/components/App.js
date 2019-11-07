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
      isCreatorVisible: false,
      tasks: [
        {
          taskName: "Test task for preview purposes",
          taskMinutes: 30,
          taskSeconds: 0,
          breakMinutes: 10,
          breakSeconds: 0,
          totalTaskTime: 30000,
          totalBreakTime: 10000,
          totalTaskTimeArray: ["30","00","00"],
          totalBreakTimeArray: ["10","00","00"],
          id: 6453654365346,
          dateCreated: 6453654365346
        },
        {
          taskName: "Another task for testing",
          taskMinutes: 0,
          taskSeconds: 4,
          breakMinutes: 0,
          breakSeconds: 4,
          totalTaskTime: 4000,
          totalBreakTime: 4000,
          totalTaskTimeArray: ["00","04","00"],
          totalBreakTimeArray: ["00","04","00"],
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
  handleTaskTimeValidition = (time, total) => /^\d*$/.test(time) && total > 0;
  handleBreakTimeValidition = (time) => /^\d*$/.test(time);

  handleTotalTime = (minutes, seconds) => {
    minutes = !minutes ? 0 : parseInt(minutes);
    seconds = !seconds ? 0 : parseInt(seconds);
    return (minutes * 60000) + (seconds * 1000);
  }

  handleTimeChange = (minutes, seconds, units, type) => {
    
    if (type === 'task') {
      const totalTaskTime = this.handleTotalTime(minutes, seconds);
      if (units === 'minutes') {
        return {
          taskMinutes: minutes,
          totalTaskTime,
          totalTaskTimeArray: this.handleTimeArray(totalTaskTime),
          isTaskTimeValid: this.handleTaskTimeValidition(minutes, totalTaskTime),
          alertTimeFlag: true
        };
      } else if (units === 'seconds') {
        return {
          taskSeconds: seconds,
          totalTaskTime,
          totalTaskTimeArray: this.handleTimeArray(totalTaskTime),
          isTaskTimeValid: this.handleTaskTimeValidition(seconds, totalTaskTime),
          alertTimeFlag: true
        };
      }
    } else if (type === 'break') {
      const totalBreakTime = this.handleTotalTime(minutes, seconds);
      if (units === 'minutes') {
        return {
          breakMinutes: minutes,
          totalBreakTime,
          totalBreakTimeArray: this.handleTimeArray(totalBreakTime),isBreakTimeValid: this.handleBreakTimeValidition(minutes),
          alertTimeFlag: true
        };
      } else if (units === 'seconds') {
        return {
          breakSeconds: seconds,
          totalBreakTime,
          totalBreakTimeArray: this.handleTimeArray(totalBreakTime),isBreakTimeValid: this.handleBreakTimeValidition(seconds),
          alertTimeFlag: true
        };
      }
    }
  }

  handleTimeArray = (time) => {
    const makeTwoDigits = (number) => number < 10 ? `0${number}` : `${number}`;
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
          onTaskRemove={this.handleTaskRemove}
          onTimeChange={this.handleTimeChange}
          validateTaskName={this.handleTaskNameValidition}
          onTimeArrayChange={this.handleTimeArray}
        />

        {/* TASK CREATOR */}
        <Creator
          compClassName={isCreatorVisible
            ? "Creator--visible slideInRight" : "slideOutLeft"}
          onStateChange={this.handleStateChange}
          onTimeChange={this.handleTimeChange}
          validateTaskName={this.handleTaskNameValidition}
        />
      </div>
    );
  }
}
export default App;