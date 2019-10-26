import React, {Component} from 'react';
import Controls from './Controls';
import Display from './Display';
import Break from './Break';
import Progress from './Progress';
import '../scss/Timer.scss';

class Timer extends Component {

  componentDidMount() {
    this.taskIntervalId = setInterval(() => this.taskTimeTick(), 10);
    this.breakIntervalId = setInterval(() => this.breakTimeTick(), 10);
  }
  
  componentWillUnmount() {
    clearInterval(this.taskIntervalId);
    clearInterval(this.breakIntervalId);
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

  breakTimeTick = () => {
    if (this.props.state.isBreakTimeActive) {

      const now = Date.now();
      const {
        breakTimeElapsed,
        previousTime
      } = this.props.state;
      
      const breakTimeElapsedResult = this.props.handleTimeArray(breakTimeElapsed);

      this.props.changeState({
        breakTimeElapsed: breakTimeElapsed + (now - previousTime),
        breakTimeElapsedArray: breakTimeElapsedResult,
        previousTime: now
      });
    }
  }

  render() {
    const {
      isTaskTimeActive,
      isBreakTimeActive,
      isElapsedMode,
      breaksTotal,
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
            isTaskTimeActive={isTaskTimeActive}
            isBreakTimeActive={isBreakTimeActive}
            breaksTotal={breaksTotal}
            changeDisplayMode={this.props.changeDisplayMode}
            changeState={this.props.changeState}
          />
  
          {/* TIMER DISPLAY */}
          <div className={`Timer__display ${isTaskTimeActive
          ? "" : "Timer__display--inactive"}`}>
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
            compClassName={`Break ${isBreakTimeActive
            ? "Break--active" : ""}`}
            breaksTotal={breaksTotal}
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