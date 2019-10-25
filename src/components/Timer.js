import React, {Component} from 'react';
import Controls from './Controls';
import Display from './Display';
import Break from './Break';
import Progress from './Progress';
import '../scss/Timer.scss';

class Timer extends Component {

  componentDidMount() {
    this.taskIntervalId = setInterval(() => this.taskTimeTick(), 10)
  }
  
  componentWillUnmount() {
    clearInterval(this.taskIntervalId);
  }

  taskTimeTick = () => {
    if (this.props.isActive) {

    }
  }

  render() {
    return (
      <section className={`Timer ${this.props.compClassName}`}>
        <div className="Timer__container">
          <h2 className="Timer__heading">Work on your task</h2>
  
          {/* CONTROL BUTTONS */}
          <Controls
            isActive={this.props.isActive}
            changeDisplayMode={this.props.changeDisplayMode}
          />
  
          {/* TIMER DISPLAY */}
          <div className="Timer__display">
            <Display
              compClassName={this.props.isElapsedMode
                ? "Display--visible Display--showUp"
                : "Display--hideUp"}
              taskTimeArray={this.props.taskTimeElapsedArray}
            />
            <Display
              compClassName={this.props.isElapsedMode
                ? "Display--hideUp"
                : "Display--visible Display--showUp"}
              taskTimeArray={this.props.taskTimeRemainingArray}
            />
          </div>
  
          {/* BREAK */}
          <Break />
  
          {/* PROGRESS */}
          <Progress />
        </div>
      </section>
    );
  }
}
export default Timer;