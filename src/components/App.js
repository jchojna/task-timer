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
      isOutroVisible: false
    }
  }

  handleCompVisibility = (object) => this.setState(object);


  render() {
    const {
      isTaskVisible,
      isTimeVisible,
      isTimerVisible,
      isStopTaskVisible,
      isOutroVisible
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__heading visuallyhidden">Task Timer App</h1>
        <Task
          className={isTaskVisible
            ? "Task--visible slideInLeft"
            : "slideOutLeft"}
          isVisible={this.handleCompVisibility}
        />
        <Time
          className={isTimeVisible
            ? "Time--visible slideInRight"
            : "slideOutRight"}
          isVisible={this.handleCompVisibility}
        />
        <Timer />
        <StopTask />
        <Outro />
      </div>
    );
  }
}
export default App;