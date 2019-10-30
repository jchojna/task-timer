import React, {Component} from 'react';
import Controls from './Controls';
import Display from './Display';
import Break from './Break';
import Progress from './Progress';
import '../scss/Timer.scss';

class Timer extends Component {

  componentDidMount() {
    this.taskIntervalId = setInterval(() => this.handleTaskTimeTick(), 10);
    this.breakIntervalId = setInterval(() => this.handleBreakTimeTick(), 10);
  }
  
  componentWillUnmount() {
    clearInterval(this.taskIntervalId);
    clearInterval(this.breakIntervalId);
  }

  handleTaskTimeTick = () => {
    const {
      isTaskTimeActive,
      taskTimeElapsed,
      taskTimeRemaining,
      previousTime,
      taskTimeTotal,
      breakTimeElapsed
    } = this.props.state;

    if (isTaskTimeActive) {
      const { onTimeArrayChange, onStateChange } = this.props;
      const now = Date.now();
      const taskTimeElapsedResult = onTimeArrayChange(taskTimeElapsed);
      const taskTimeTotalResult = onTimeArrayChange(taskTimeTotal);
      const taskTimeRemainingResult = onTimeArrayChange(taskTimeRemaining);
      const overallTimeResult = onTimeArrayChange(taskTimeElapsed + breakTimeElapsed);
      const percentElapsed = taskTimeElapsed / taskTimeTotal * 100;
      const percentRemaining = taskTimeRemaining / taskTimeTotal * 100;

      // when task time finishes
      if (taskTimeElapsed >= taskTimeTotal) {
        onStateChange({
          isStopTaskVisible: false,
          isTimerVisible: false,
          isTaskTimeActive: false,
          taskTimeElapsed: taskTimeTotal,
          taskTimeRemaining: 0,
          taskTimeElapsedArray: taskTimeTotalResult,
          taskTimeRemainingArray: ['00','00','00'],
          percentElapsed: 100,
          percentRemaining: 0,
          isOutroVisible: true,
          overallTime: taskTimeElapsed + breakTimeElapsed,
          overallTimeArray: overallTimeResult
        });
      // normal task time tick
      } else {
        onStateChange({
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

  handleBreakTimeTick = () => {
    const {
      taskTimeElapsed,
      isBreakTimeActive,
      breakTimeElapsed,
      breakTimeTotal,
      previousTime
    } = this.props.state;
    
    if (isBreakTimeActive) {
      const { onStateChange, onTimeArrayChange } = this.props;
      const now = Date.now();
      const breakTimeElapsedResult = onTimeArrayChange(breakTimeElapsed);
      const breakTimeTotalResult = onTimeArrayChange(breakTimeTotal);

      // when break time finishes
      if (breakTimeElapsed >= breakTimeTotal) {
        onStateChange({
          isBreakTimeActive: false,
          isTimerVisible: false,
          isFailureVisible: true,
          overallTime: taskTimeElapsed + breakTimeElapsed,
          breakTimeElapsed: breakTimeTotal,
          breakTimeElapsedArray: breakTimeTotalResult
        })
      } else {
        // normal break time tick
        onStateChange({
          breakTimeElapsed: breakTimeElapsed + (now - previousTime),
          breakTimeElapsedArray: breakTimeElapsedResult,
          previousTime: now
        });
      }
    }
  }

  render() {
    const {
      taskName,
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

    const {
      compClassName,
      onDisplayModeChange,
      onStateChange
    } = this.props;

    return (
      <section className={`Timer ${compClassName}`}>
        <div className="Timer__container">
          <h2 className="Timer__heading">{`"${taskName}"`}</h2>
          {/* CONTROL BUTTONS */}
          <Controls
            isTaskTimeActive={isTaskTimeActive}
            isBreakTimeActive={isBreakTimeActive}
            breaksTotal={breaksTotal}
            onDisplayModeChange={onDisplayModeChange}
            onStateChange={onStateChange}
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