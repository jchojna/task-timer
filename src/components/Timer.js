import React, {Component} from 'react';
import TimeDisplay from './TimeDisplay.js';
import Controls from './Controls';
import Break from './Break';
import Progress from './Progress';
import '../scss/Timer.scss';

class Timer extends Component {
  constructor(props) {
    super(props);
    const { startTime, totalTaskTime, totalBreakTime } = this.props.state;
    this.state = {
      isElapsedMode: true,
      isTaskTimeActive: true,
      isBreakTimeActive: false,
      // total
      totalTaskTime,
      totalBreakTime,
      totalBreaks: 0,
      // elapsed
      elapsedTaskTime: 0,
      elapsedTaskTimeArray: ['00','00','00'],
      elapsedTaskPercent: 0,
      elapsedBreakTime: 0,
      elapsedBreakTimeArray: ['00','00','00'],
      //remaining
      remainingTaskTime: 0,
      remainingTaskPercent: 100,
      remainingTaskTimeArray: ['00','00','00'],
      // overall
      previousTime: startTime,
      //overallTime: 0,
      //overallTimeArray: ['00','00','00']
    }
  }

  componentDidMount() {
    this.taskIntervalId = setInterval(() => this.handleTaskTimeTick(), 10);
    this.breakIntervalId = setInterval(() => this.handleBreakTimeTick(), 10);
  }
  
  componentWillUnmount() {
    clearInterval(this.taskIntervalId);
    clearInterval(this.breakIntervalId);
  }

  handleStateChange = (object) => this.setState(object);
  
  handleDisplayMode = () => this.setState(prevState => ({
    isElapsedMode: !prevState.isElapsedMode
  }));

  handleTaskTimeTick = () => {

    if (this.state.isTaskTimeActive) {
      const {
        totalTaskTime,
        elapsedTaskTime,
        remainingTaskTime,
        previousTime
      } = this.state;
      const { onTimeArrayChange } = this.props;
      const now = Date.now();
      const elapsedTaskTimeArray = onTimeArrayChange(elapsedTaskTime);
      const totalTaskTimeArray = onTimeArrayChange(totalTaskTime);
      const remainingTaskTimeArray = onTimeArrayChange(remainingTaskTime);
      const elapsedTaskPercent = elapsedTaskTime / totalTaskTime * 100;
      const remainingTaskPercent = remainingTaskTime / totalTaskTime * 100;
      //const overallTimeResult = onTimeArrayChange(taskTimeElapsed + breakTimeElapsed);

      // when task time finishes
      if (elapsedTaskTime >= totalTaskTime) {
        this.setState({
          //isStopTaskVisible: false,
          //isTimerVisible: false,
          //isOutroVisible: true,
          isTaskTimeActive: false,
          elapsedTaskTime: totalTaskTime,
          elapsedTaskTimeArray: totalTaskTimeArray,
          remainingTaskTimeArray: ['00','00','00'],
          elapsedTaskPercent: 100,
          remainingTaskTime: 0,
          remainingTaskPercent: 0,
          //overallTime: taskTimeElapsed + breakTimeElapsed,
          //overallTimeArray: overallTimeResult
        });
      // normal task time tick
      } else {
        this.setState({
          previousTime: now,
          elapsedTaskTime: elapsedTaskTime + (now - previousTime),
          elapsedTaskTimeArray,
          remainingTaskTime: totalTaskTime - elapsedTaskTime,
          remainingTaskTimeArray,
          elapsedTaskPercent,
          remainingTaskPercent
        });
      }
    }
  }

  handleBreakTimeTick = () => {
    
    if (this.state.isBreakTimeActive) {

      const {
        totalBreakTime,
        elapsedBreakTime,
        previousTime
      } = this.state;

      const { onTimeArrayChange } = this.props;

      const now = Date.now();
      const elapsedBreakTimeArray = onTimeArrayChange(elapsedBreakTime);
      const totalBreakTimeArray = onTimeArrayChange(totalBreakTime);

      // when break time finishes
      if (elapsedBreakTime >= totalBreakTime) {
        this.setState({
          //isTimerVisible: false,
          //isFailureVisible: true,
          isBreakTimeActive: false,
          elapsedBreakTime: totalBreakTime,
          elapsedBreakTimeArray: totalBreakTimeArray
          //overallTime: taskTimeElapsed + breakTimeElapsed
        })
      } else {
        // normal break time tick
        this.setState({
          previousTime: now,
          elapsedBreakTime: elapsedBreakTime + (now - previousTime),
          elapsedBreakTimeArray
        });
      }
    }
  }

  render() {
    
    const {
      taskName
    } = this.props.state;

    const {
      isElapsedMode,
      isTaskTimeActive,
      isBreakTimeActive,
      elapsedTaskTimeArray,
      elapsedTaskPercent,
      elapsedBreakTimeArray,
      remainingTaskPercent,
      remainingTaskTimeArray,
      totalBreaks
    } = this.state;

    const {
      className,
      onTaskStateChange
    } = this.props;

    return (
      <section className={`Timer ${className}`}>
        <div className="Timer__container">
          <h2 className="Timer__heading">{`"${taskName}"`}</h2>
          {/* CONTROL BUTTONS */}
          <Controls
            isTaskTimeActive={isTaskTimeActive}
            isBreakTimeActive={isBreakTimeActive}
            totalBreaks={totalBreaks}
            onDisplayModeChange={this.handleDisplayMode}
            onTimerStateChange={this.handleStateChange}
            onTaskStateChange={onTaskStateChange}
          />

          {/* TIMER DISPLAY */}
          <TimeDisplay
            isElapsedMode={isElapsedMode}
            className="Timer__display"
            elapsedTimeArray={elapsedTaskTimeArray}
            remainingTimeArray={remainingTaskTimeArray}
          />

          {/* BREAK */}
          {/* <Break
            compClassName={`Break ${isBreakTimeActive
            ? "Break--active" : ""}`}
            totalBreaks={totalBreaks}
            elapsedBreakTimeArray={elapsedBreakTimeArray}
          /> */}

          {/* PROGRESS */}
          <Progress
            isElapsedMode={isElapsedMode}
            elapsedTaskPercent={elapsedTaskPercent}
            remainingTaskPercent={remainingTaskPercent}
          />
        </div>
      </section>
    );
  }
}
export default Timer;