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
    if (this.props.state.isTaskTimeActive) {

      const now = Date.now();
      const {
        taskTimeElapsed,
        taskTimeRemaining,
        previousTime,
        taskTimeTotal,
        breakTimeElapsed
      } = this.props.state;
      
      const taskTimeElapsedResult = this.props.handleTimeArray(taskTimeElapsed);
      const taskTimeRemainingResult = this.props.handleTimeArray(taskTimeRemaining);
      const percentElapsed = taskTimeElapsed / taskTimeTotal * 100;
      const percentRemaining = taskTimeRemaining / taskTimeTotal * 100;

      // when countdown finishes
      if (taskTimeElapsed >= taskTimeTotal) {

        this.props.changeState({
          isTaskTimeActive: false,
          taskTimeElapsed: taskTimeTotal,
          taskTimeRemaining: 0,
          overallTime: taskTimeElapsed + breakTimeElapsed,
          taskTimeElapsedArray: taskTimeElapsedResult,
          taskTimeRemainingArray: taskTimeRemainingResult,
          percentElapsed: percentElapsed,
          percentRemaining: percentRemaining
        });

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
          taskTimeElapsedArray: taskTimeElapsedResult,
          taskTimeRemaining: taskTimeTotal - taskTimeElapsed,
          taskTimeRemainingArray: taskTimeRemainingResult,
          percentElapsed: percentElapsed,
          percentRemaining: percentRemaining
        });
      }
    }
  }

  render() {
    const {
      isTaskTimeActive,
      isElapsedMode,
      taskTimeElapsedArray,
      taskTimeRemainingArray,
      breakTimeElapsedArray,
      percentElapsed,
      percentRemaining
    } = this.props.state;

    return (
      <section className={`Timer ${this.props.compClassName}`}>
        <div className="Timer__container">
          <h2 className="Timer__heading">Work on your task</h2>
  
          {/* CONTROL BUTTONS */}
          <Controls
            isTaskActive={isTaskTimeActive}
            changeDisplayMode={this.props.changeDisplayMode}
          />
  
          {/* TIMER DISPLAY */}
          <div className="Timer__display">
            <Display
              compClassName={isElapsedMode
                ? "Display Display--visible Display--showUp"
                : "Display Display--hideUp"}
              taskTimeArray={taskTimeElapsedArray}
            />
            <Display
              compClassName={isElapsedMode
                ? "Display Display--hideUp"
                : "Display Display--visible Display--showUp"}
              taskTimeArray={taskTimeRemainingArray}
            />
          </div>
  
          {/* BREAK */}
          <Break
            compClassName={isTaskTimeActive
              ? "Break"
              : "Break Break--active"}
            breakTimeElapsedArray={breakTimeElapsedArray}
          />

          {/* PROGRESS */}
          <Progress
            isElapsedMode={isElapsedMode}
            percentElapsed={percentElapsed}
            percentRemaining={percentRemaining}
          />
        </div>
      </section>
    );
  }
}
export default Timer;