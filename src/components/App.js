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
      isTaskVisible: false,
      isTimeVisible: true,
      isTimerVisible: true,
      isStopTaskVisible: false,
      isOutroVisible: false,
      isWorkTimeActive: false,
      isBreakTimeActive: false,
      taskName: null,
      isTaskNameValid: false,
      taskTimePlanned: null,
      breakTimePlanned: null,
      isTaskTimePlannedValid: false,
      isBreakTimePlannedValid: true
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

  handleStartButton = () => {
    this.setState({
      isTimeVisible: false,
      isTimerVisible: true,
      isWorkTimeActive: true
    })
  }

  render() {
    const {
      isTaskVisible,
      isTimeVisible,
      isTimerVisible,
      isStopTaskVisible,
      isOutroVisible,
      isWorkTimeActive,
      isBreakTimeActive,
      taskName,
      isTaskNameValid,
      taskTimePlanned,
      breakTimePlanned,
      isTaskTimePlannedValid,
      isBreakTimePlannedValid
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
            : isTimerVisible ? "slideOutLeft" : "slideOutRight"}
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
        />

        <Timer
          compClassName={isTimerVisible
            ? "Timer--visible slideInRight"
            : ""}
          isActive={isWorkTimeActive}
        />
        <StopTask />
        <Outro />
      </div>
    );
  }
}
export default App;