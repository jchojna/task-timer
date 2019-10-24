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
      isTaskVisible: true,
      isTimeVisible: false,
      isTimerVisible: false,
      isStopTaskVisible: false,
      isOutroVisible: false,
      taskName: null,
      isTaskNameValid: false,
      taskTimePlanned: null,
      isTaskTimePlannedValid: false
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

  handleStartButton = () => {
    this.setState({
      isTimeVisible: false,
      isTimerVisible: true
    })
  }

  render() {
    const {
      isTaskVisible,
      isTimeVisible,
      isTimerVisible,
      isStopTaskVisible,
      isOutroVisible,
      taskName,
      isTaskNameValid,
      taskTimePlanned,
      isTaskTimePlannedValid
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
          alertClassName={!isTaskTimePlannedValid && taskTimePlanned != null
            ? "Time__alert--visible"
            : ""}

          isVisible={this.handleCompVisibility}
          taskTimePlanned={this.handleTaskTimePlanned}
          taskTimePlannedValidity={isTaskTimePlannedValid}
          handleStartButton={this.handleStartButton}
        />
        <Timer
          compClassName={isTimerVisible
            ? "Timer--visible slideInRight"
            : ""
          }
        />
        <StopTask />
        <Outro />
      </div>
    );
  }
}
export default App;