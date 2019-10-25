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

  handleTimeArray = (time) => {
    const makeTwoDigits = (number) => number < 10 ? `0${number}` : number;
    return [
      makeTwoDigits(Math.floor(time / 60000)),
      makeTwoDigits(Math.floor(time / 1000 % 60)),
      makeTwoDigits(Math.floor(time / 10 % 100))
    ]
  }

  taskTimeTick = () => {
    if (this.props.isTaskActive) {

      const now = Date.now();
      const {
        taskTimeElapsed,
        taskTimeRemaining,
        taskTimeElapsedArray,
        previousTime,
        taskTimeTotal,
        breakTimeElapsed,
        overallTime
      } = this.props.state;
      
      const taskTimeElapsedResult = this.handleTimeArray(taskTimeElapsed);

      // when countdown finishes
      if (taskTimeElapsed >= taskTimeTotal) {
        console.log('stop');

        this.props.changeState({
          isTaskActive: false,
          taskTimeElapsed: taskTimeTotal,
          taskTimeRemaining: 0,
          overallTime: taskTimeElapsed + breakTimeElapsed
        });

        clearInterval(this.taskIntervalId);

        /*
        task.overallTimeArray = task.overallTime;
        stopSection.classList.contains('stop--visible') ? toggleStopConfirm() : false;
        stopWorktime();
        handleOutro();
        outroRetryButton.addEventListener('click', handleRetry); */

      } else {
        this.props.changeState({
          previousTime: now,
          taskTimeElapsed: taskTimeElapsed + (now - previousTime),
          taskTimeElapsedArray: taskTimeElapsedResult
        });
      }
      /* task.workTimeRemaining = timeTotal - workTimeElapsed;
      task.workTimeElapsedArray = workTimeElapsed;
      task.workTimeRemainingArray = workTimeRemaining;
      displayElapsed.textContent = task.workTimeElapsedArray.join(':');
      displayRemaining.textContent = task.workTimeRemainingArray.join(':');
      handlePercentSection(workTimeElapsed, progressPercentElapsed, progressBarElapsed);
      handlePercentSection(workTimeRemaining, progressPercentRemaining, progressBarRemaining); */
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