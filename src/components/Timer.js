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
    if (this.props.isTaskActive) {

    }
  }

  render() {
    return (
      <section className={`Timer ${this.props.compClassName}`}>
        <div className="Timer__container">
          <h2 className="Timer__heading">Work on your task</h2>
  
          {/* CONTROL BUTTONS */}
          <Controls
            isTaskActive={this.props.isTaskActive}
            changeDisplayMode={this.props.changeDisplayMode}
          />
  
          {/* TIMER DISPLAY */}
          <div className="Timer__display">
            <Display
              compClassName={this.props.isElapsedMode
                ? "Display Display--visible Display--showUp"
                : "Display Display--hideUp"}
              taskTimeArray={this.props.taskTimeElapsedArray}
            />
            <Display
              compClassName={this.props.isElapsedMode
                ? "Display Display--hideUp"
                : "Display Display--visible Display--showUp"}
              taskTimeArray={this.props.taskTimeRemainingArray}
            />
          </div>
  
          {/* BREAK */}
          <Break
            compClassName={this.props.isTaskActive
              ? "Break"
              : "Break Break--active"}
            breakTimeElapsedArray={this.props.breakTimeElapsedArray}
          />

          {/* PROGRESS */}
          <Progress />
        </div>
      </section>
    );
  }
}
export default Timer;