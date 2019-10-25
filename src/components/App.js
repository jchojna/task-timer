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
      // task
      taskName: null,
      isTaskNameValid: false,
      taskTimePlanned: null,
      isTaskTimePlannedValid: false,
      taskTimeTotal: 0,
      isTaskTimeActive: false,
      // break
      breakTimePlanned: null,
      isBreakTimePlannedValid: true,
      isBreakTimeActive: false,
      previousTime: 0
    }
  }

  handleCompVisibility = (object) => this.setState(object);

  handleTaskName = (name) => {
    this.setState({
      taskName: name,
      isTaskNameValid: name.length > 0 ? true : false 
    });
  }

  handleTaskTimePlanned = (time) => {
    this.setState({
      taskTimePlanned: time,
      isTaskTimePlannedValid: /(\d?\d[Mm])?(\d?\d[Ss])/.test(time)
    })
  }
  
  handleBreakTimePlanned = (time) => {
    this.setState({
      breakTimePlanned: time,
      isBreakTimePlannedValid: /^((\d?\d[Mm])?\d?\d[Ss]|)$/.test(time)
    })
  }

  handleTotalTime = () => {
    const {taskTimePlanned} = this.state;
    let time = taskTimePlanned.split(/[mM]/).map(a => parseInt(a) || 0);
    // if time format 00m is acceptable
    time = time.length > 1 ? time : [0, ...time];
    const [minutes, seconds] = time;
    return minutes * 60000 + seconds * 1000;
  }

  handleStartButton = () => {
    const taskTimeTotal = this.handleTotalTime();
    this.setState({
      isTimeVisible: false,
      isTimerVisible: true,
      isTaskTimeActive: true,
      previousTime: Date.now(),
      taskTimeTotal: taskTimeTotal
    })
  }

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
      taskTimeTotal,
      isTaskTimeActive,
      // break
      breakTimePlanned,
      isBreakTimePlannedValid,
      isBreakTimeActive,
      previousTime
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
          isVisible={this.handleCompVisibility}
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
          isVisible={this.handleCompVisibility}
          taskTimePlanned={this.handleTaskTimePlanned}
          breakTimePlanned={this.handleBreakTimePlanned}
          taskTimePlannedValidity={isTaskTimePlannedValid}
          breakTimePlannedValidity={isBreakTimePlannedValid}
          handleStartButton={this.handleStartButton}
          isTimerActive={isTaskTimeActive}
        />

        <Timer
          compClassName={isTimerVisible
            ? "Timer--visible slideInRight"
            : ""}
          isActive={isTaskTimeActive}
        />

        <StopTask />

        <Outro />
      </div>
    );
  }
}
export default App;