import React, {Component} from 'react';
import Controls from './Controls';
import Countdown from './Countdown';
import Break from './Break';
import '../scss/Timer.scss';

class Timer extends Component {
  constructor(props) {
    super(props);
    const {
      startTime,
      totalTaskTime,
      totalBreakTime,
      totalTaskTimeArray,
      totalBreakTimeArray } = this.props.state;

    this.state = {
      isTaskTimeElapsedMode: true,
      isBreakTimeElapsedMode: true,
      isTaskTimeActive: true,
      isBreakTimeActive: false,
      // total
      totalTaskTime,
      totalBreakTime,
      totalBreaks: 0,
      // elapsed
      elapsedTaskTime: 0,
      elapsedTaskPercent: 0,
      elapsedTaskTimeArray: ['00','00','00'],
      elapsedBreakTime: 0,
      elapsedBreakPercent: 0,
      elapsedBreakTimeArray: ['00','00','00'],
      //remaining
      remainingTaskTime: 0,
      remainingTaskPercent: 100,
      remainingTaskTimeArray: totalTaskTimeArray,
      remainingBreakTime: 0,
      remainingBreakPercent: 100,
      remainingBreakTimeArray: totalBreakTimeArray,
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
  
  handleTaskTimeDisplayMode = () => this.setState(prevState => ({
    isTaskTimeElapsedMode: !prevState.isTaskTimeElapsedMode
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
        remainingBreakTime,
        previousTime
      } = this.state;

      const { onTimeArrayChange } = this.props;
      const now = Date.now();
      const elapsedBreakTimeArray = onTimeArrayChange(elapsedBreakTime);
      const totalBreakTimeArray = onTimeArrayChange(totalBreakTime);
      const remainingBreakTimeArray = onTimeArrayChange(remainingBreakTime);
      const elapsedBreakPercent = elapsedBreakTime / totalBreakTime * 100;
      const remainingBreakPercent = remainingBreakTime / totalBreakTime * 100;

      // when break time finishes
      if (elapsedBreakTime >= totalBreakTime) {
        this.setState({
          //isTimerVisible: false,
          //isFailureVisible: true,
          isBreakTimeActive: false,
          elapsedBreakTime: totalBreakTime,
          elapsedBreakTimeArray: totalBreakTimeArray,
          remainingBreakTimeArray: ['00','00','00'],
          elapsedBreakPercent: 100,
          remainingBreakTime: 0,
          remainingBreakPercent: 0,
          //overallTime: taskTimeElapsed + breakTimeElapsed
        })
      } else {
        // normal break time tick
        this.setState({
          previousTime: now,
          elapsedBreakTime: elapsedBreakTime + (now - previousTime),
          elapsedBreakTimeArray,
          remainingBreakTime: totalBreakTime - elapsedBreakTime,
          remainingBreakTimeArray,
          elapsedBreakPercent,
          remainingBreakPercent
        });
      }
    }
  }

  render() {
    
    const {
      taskName
    } = this.props.state;

    const {
      isTaskTimeElapsedMode,
      isBreakTimeElapsedMode,
      isTaskTimeActive,
      isBreakTimeActive,
      elapsedTaskPercent,
      elapsedTaskTimeArray,
      elapsedBreakPercent,
      elapsedBreakTimeArray,
      remainingTaskPercent,
      remainingTaskTimeArray,
      remainingBreakPercent,
      remainingBreakTimeArray,
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
            onDisplayModeChange={this.handleTaskTimeDisplayMode}
            onTimerStateChange={this.handleStateChange}
            onTaskStateChange={onTaskStateChange}
          />

          {/* TASK TIME COUNTDOWN */}
          <Countdown
            modifier="taskTime"
            isElapsedMode={isTaskTimeElapsedMode}
            elapsedTimeArray={elapsedTaskTimeArray}
            remainingTimeArray={remainingTaskTimeArray}
            elapsedTaskPercent={elapsedTaskPercent}
            remainingTaskPercent={remainingTaskPercent}
          />
          
          {/* BREAK TIME COUNTDOWN */}
          <Countdown
            modifier="breakTime"
            isElapsedMode={isBreakTimeElapsedMode}
            elapsedTimeArray={elapsedBreakTimeArray}
            remainingTimeArray={remainingBreakTimeArray}
            elapsedTaskPercent={elapsedBreakPercent}
            remainingTaskPercent={remainingBreakPercent}
          />

          {/* BREAK */}
          {/* <Break
            compClassName={`Break ${isBreakTimeActive
            ? "Break--active" : ""}`}
            totalBreaks={totalBreaks}
            elapsedBreakTimeArray={elapsedBreakTimeArray}
          /> */}
        </div>
      </section>
    );
  }
}
export default Timer;