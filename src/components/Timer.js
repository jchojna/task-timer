import React, {Component} from 'react';
import classNames from 'classnames';
import Countdown from './Countdown';
import StopTimer from './StopTimer.js';
import Controls from './Controls';
import Finish from './Finish.js';
import { getTimeArray } from '../lib/handlers';
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
      isTimerStarted: false,
      flipCardTime: 500,
      // visibility
      isStopTimerVisible: false,
      isFinishVisible: false,
      isTimerVisible: false,
      // modes
      isTaskTimeElapsedMode: true,
      isBreakTimeElapsedMode: true,
      isTaskTimeActive: true,
      isBreakTimeActive: false,
      isTaskFinished: false,
      isBreakFinished: false,
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
      overallTime: 0,
      overallTimeArray: ['00','00','00']
    }
  }

  componentDidMount() {
    this.taskIntervalId = setInterval(() => this.handleTimeTick('Task'), 10);
    this.breakIntervalId = setInterval(() => this.handleTimeTick('Break'), 10);
    this.timeoutIntroId = setTimeout(() => this.setState({
      isTimerStarted: true,
      isTimerVisible: true,
      previousTime: Date.now()
    }), this.state.flipCardTime/2);
  }
  
  componentWillUnmount() {
    clearInterval(this.taskIntervalId);
    clearInterval(this.breakIntervalId);
    clearTimeout(this.timeoutIntroId);
    clearTimeout(this.timeoutOutroId);
  }

  handleStateChange = (object) => this.setState(object);
  
  handleTimeDisplayMode = () => {
    const { isTaskTimeActive } = this.state;
    const type = isTaskTimeActive ? "Task" : "Break";
    this.setState(prevState => ({
      [`is${type}TimeElapsedMode`]: !prevState[`is${type}TimeElapsedMode`]
    }));
  }

  handleTimerStop = () => {
    const { onTaskStateChange } = this.props;
    onTaskStateChange({ isCardFlippedMode: false });
    this.setState({
      isTimerStarted: false,
      isStopTimerVisible: false
    });
    this.timeoutOutroId = setTimeout(() => {
      onTaskStateChange({
        isTimerVisible: false,
        isTimerAppended: false
      });
    }, this.state.flipCardTime/2);
  }

  handleTimeTick = (type) => {
    if (this.state[`is${type}TimeActive`] && this.state.isTimerStarted) {

      const { previousTime, elapsedTaskTime, elapsedBreakTime } = this.state;
      const totalTime = this.state[`total${type}Time`];
      const elapsedTime = this.state[`elapsed${type}Time`];
      const remainingTime = this.state[`remaining${type}Time`];
      const overallTime = elapsedTaskTime + elapsedBreakTime;

      const now = Date.now();
      const elapsedTimeArray   = getTimeArray(elapsedTime);
      const totalTimeArray     = getTimeArray(totalTime);
      const remainingTimeArray = getTimeArray(remainingTime);
      const overallTimeArray   = getTimeArray(overallTime);
      const elapsedPercent   = elapsedTime / totalTime * 100;
      const remainingPercent = remainingTime / totalTime * 100;

      // when task time finishes
      if (elapsedTime >= totalTime) {
        this.setState({
          [`is${type}TimeActive`]: false,
          [`elapsed${type}Time`]: totalTime,
          [`elapsed${type}TimeArray`]: totalTimeArray,
          [`remaining${type}TimeArray`]: ['00','00','00'],
          [`elapsed${type}Percent`]: 100,
          [`remaining${type}Time`]: 0,
          [`remaining${type}Percent`]: 0,
          [`is${type}Finished`]: true,
          isStopTimerVisible: false,
          isFinishVisible: true,
          overallTime,
          overallTimeArray,
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
    
    const { taskName } = this.props.state;

    const {
      isTimerVisible,
      isStopTimerVisible,
      isTaskTimeElapsedMode,
      isBreakTimeElapsedMode,
      isTaskFinished,
      isBreakFinished,
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
      id,
      onTaskStateChange,
      onTaskRemove
    } = this.props;

    const timerClass = classNames("Timer", {
      "Timer--visible": isTimerVisible,
      "Timer--taskTime": isTaskTimeActive,
      "Timer--breakTime": isBreakTimeActive
    });

    return (
      <section className={timerClass}>
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
            totalBreaks={totalBreaks}
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
            totalBreaks={totalBreaks}
            onTaskStateChange={onTaskStateChange}
          />
        </div>
        {/* CONTROL BUTTONS */}
        <Controls
          isTaskTimeActive={isTaskTimeActive}
          isBreakTimeActive={isBreakTimeActive}
          onDisplayModeChange={this.handleTimeDisplayMode}
          onTimerStateChange={this.handleStateChange}
        />
        {/* STOP TASK SECTION */}
        <StopTimer
          isStopTimerVisible={isStopTimerVisible}
          onTimerStateChange={this.handleStateChange}
          onTaskStateChange={onTaskStateChange}
          onTimerStop={this.handleTimerStop}
        />
        {/* TASK TIME EXCEEDED */}
        {
          isTaskFinished
          ? <Finish
            isTaskFinished={isTaskFinished}
            taskName={taskName}
            state={this.state}
            onTimerStateChange={this.handleStateChange}
            onTaskStateChange={onTaskStateChange}
            onTaskRemove={onTaskRemove}
            onTimerRestart={this.handleTimerStop}
            id={id}
          />
          : <div></div>
        }
        {/* BREAK TIME EXCEEDED */}
        {
          isBreakFinished
          ? <Finish
            isTaskFinished={isTaskFinished}
            taskName={taskName}
            state={this.state}
            onTimerStateChange={this.handleStateChange}
            onTaskStateChange={onTaskStateChange}
            onTaskRemove={onTaskRemove}
            onTimerRestart={this.handleTimerStop}
            id={id}
          />
          : <div></div>
        }
      </section>
    );
  }
}
export default Timer;