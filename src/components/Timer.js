import React, {Component} from 'react';
import Countdown from './Countdown';
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
    this.taskIntervalId = setInterval(() => this.handleTimeTick('Task'), 10);
    this.breakIntervalId = setInterval(() => this.handleTimeTick('Break'), 10);
  }
  
  componentWillUnmount() {
    clearInterval(this.taskIntervalId);
    clearInterval(this.breakIntervalId);
  }

  handleStateChange = (object) => this.setState(object);
  
  handleTaskTimeDisplayMode = () => this.setState(prevState => ({
    isTaskTimeElapsedMode: !prevState.isTaskTimeElapsedMode
  }));
  
  handleBreakTimeDisplayMode = () => this.setState(prevState => ({
    isBreakTimeElapsedMode: !prevState.isBreakTimeElapsedMode
  }));

  handleTimeTick = (type) => {
    if (this.state[`is${type}TimeActive`]) {

      const { previousTime } = this.state;
      const totalTime = this.state[`total${type}Time`];
      const elapsedTime = this.state[`elapsed${type}Time`];
      const remainingTime = this.state[`remaining${type}Time`];

      const { onTimeArrayChange } = this.props;
      const now = Date.now();
      const elapsedTimeArray = onTimeArrayChange(elapsedTime);
      const totalTimeArray = onTimeArrayChange(totalTime);
      const remainingTimeArray = onTimeArrayChange(remainingTime);
      const elapsedPercent = elapsedTime / totalTime * 100;
      const remainingPercent = remainingTime / totalTime * 100;
      //const overallTimeResult = onTimeArrayChange(taskTimeElapsed + breakTimeElapsed);

      // when task time finishes
      if (elapsedTime >= totalTime) {
        this.setState({
          //isStopTaskVisible: false,
          //isTimerVisible: false,
          //isOutroVisible: true,
          [`is${type}TimeActive`]: false,
          [`elapsed${type}Time`]: totalTime,
          [`elapsed${type}TimeArray`]: totalTimeArray,
          [`remaining${type}TimeArray`]: ['00','00','00'],
          [`elapsed${type}Percent`]: 100,
          [`remaining${type}Time`]: 0,
          [`remaining${type}Percent`]: 0,
          //overallTime: taskTimeElapsed + breakTimeElapsed,
          //overallTimeArray: overallTimeResult
        });
      // normal task time tick
      } else {
        this.setState({
          previousTime: now,
          [`elapsed${type}Time`]: elapsedTime + (now - previousTime),
          [`elapsed${type}TimeArray`]: elapsedTimeArray,
          [`remaining${type}Time`]: totalTime - elapsedTime,
          [`remaining${type}TimeArray`]: remainingTimeArray,
          [`elapsed${type}Percent`]: elapsedPercent,
          [`remaining${type}Percent`]: remainingPercent
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
        <h2 className="Timer__heading">{`"${taskName}"`}</h2>
        <div className="Timer__container">
          {/* TASK TIME COUNTDOWN */}
          <Countdown
            modifier="taskTime"
            isElapsedMode={isTaskTimeElapsedMode}
            elapsedTimeArray={elapsedTaskTimeArray}
            remainingTimeArray={remainingTaskTimeArray}
            elapsedTaskPercent={elapsedTaskPercent}
            remainingTaskPercent={remainingTaskPercent}
            isCountdownVisible={isTaskTimeActive}
            isTaskTimeActive={isTaskTimeActive}
            isBreakTimeActive={isBreakTimeActive}
            totalBreaks={totalBreaks}
            onDisplayModeChange={this.handleTaskTimeDisplayMode}
            onTimerStateChange={this.handleStateChange}
            onTaskStateChange={onTaskStateChange}
          />
          {/* BREAK TIME COUNTDOWN */}
          <Countdown
            modifier="breakTime"
            isElapsedMode={isBreakTimeElapsedMode}
            elapsedTimeArray={elapsedBreakTimeArray}
            remainingTimeArray={remainingBreakTimeArray}
            elapsedTaskPercent={elapsedBreakPercent}
            remainingTaskPercent={remainingBreakPercent}
            isCountdownVisible={isBreakTimeActive}
            isTaskTimeActive={isTaskTimeActive}
            isBreakTimeActive={isBreakTimeActive}
            totalBreaks={totalBreaks}
            onDisplayModeChange={this.handleBreakTimeDisplayMode}
            onTimerStateChange={this.handleStateChange}
            onTaskStateChange={onTaskStateChange}
          />
        </div>
      </section>
    );
  }
}
export default Timer;