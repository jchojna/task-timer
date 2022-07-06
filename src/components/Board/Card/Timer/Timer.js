import React, { Component } from 'react';
import classNames from 'classnames';
import Countdown from './Countdown';
import StopAlert from '../StopAlert';
import Progress from './Progress';
import Controls from './Controls';
import Finish from './Finish';
import { getTimeArray, breaksAmount } from 'lib/handlers';
import { cardFlipTime } from 'lib/globalVariables';
import 'scss/Timer.scss';

class Timer extends Component {
  constructor(props) {
    super(props);
    const {
      startTime,
      totalTaskTime,
      totalBreakTime,
      totalTaskTimeArray,
      totalBreakTimeArray,
    } = this.props.state;

    this.state = {
      // visibility
      isStopAlertVisible: false,
      isTimerVisible: false,
      // modes
      isTaskTimeElapsedMode: true,
      isBreakTimeElapsedMode: true,
      isTaskFinished: false,
      isBreakFinished: false,
      // total
      totalTaskTime,
      totalBreakTime,
      totalBreaks: 0,
      // elapsed
      elapsedTaskTime: 0,
      elapsedTaskPercent: 0,
      elapsedTaskTimeArray: ['00', '00', '00'],
      elapsedBreakTime: 0,
      elapsedBreakPercent: 0,
      elapsedBreakTimeArray: ['00', '00', '00'],
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
      overallTimeArray: ['00', '00', '00'],
    };
  }

  componentDidMount() {
    const { onCardStateChange } = this.props;

    onCardStateChange({ isTaskTimeActive: true });

    this.taskIntervalId = setInterval(() => this.handleTimeTick('Task'), 10);
    this.breakIntervalId = setInterval(() => this.handleTimeTick('Break'), 10);

    this.timeoutId = setTimeout(() => {
      this.setState({
        isTimerVisible: true,
        previousTime: Date.now(),
      });
      onCardStateChange({ isTimerStarted: true });
    }, cardFlipTime);

    this.handleRotatingStatus();
  }

  componentWillUnmount() {
    clearInterval(this.taskIntervalId);
    clearInterval(this.breakIntervalId);
    clearTimeout(this.timeoutId);
    this.props.onCardStateChange({
      isTaskTimeActive: false,
      isBreakTimeActive: false,
    });
  }

  handleRotatingStatus = () => {
    const { onCardStateChange } = this.props;
    setTimeout(() => {
      onCardStateChange({
        isTaskRotatingIn: true,
        isTaskRotatingOut: false,
      });
    }, cardFlipTime);

    setTimeout(() => {
      onCardStateChange({
        isTaskRotatingIn: false,
      });
    }, cardFlipTime * 2);
  };

  handleTimerStop = () => {
    const { onCardStateChange } = this.props;

    onCardStateChange({
      isTaskRotatingOut: true,
      isTimerStarted: false,
    });

    this.setState({ isStopAlertVisible: false });

    this.timeoutId = setTimeout(() => {
      onCardStateChange({ isTimerMounted: false });
      clearTimeout(this.timeoutId);
    }, cardFlipTime);

    this.handleRotatingStatus();
  };

  handleStateChange = (object) => this.setState(object);

  handleTimeDisplayMode = () => {
    const { isTaskTimeActive } = this.props.state;
    const type = isTaskTimeActive ? 'Task' : 'Break';
    this.setState((prevState) => ({
      [`is${type}TimeElapsedMode`]: !prevState[`is${type}TimeElapsedMode`],
    }));
  };

  handleAlertVisibility = () => {
    this.setState((prevState) => ({
      isStopAlertVisible: !prevState.isStopAlertVisible,
    }));
  };

  handleTimeTick = (type) => {
    // type = task or break

    if (
      this.props.state[`is${type}TimeActive`] &&
      this.props.state.isTimerStarted
    ) {
      const { previousTime, elapsedTaskTime, elapsedBreakTime } = this.state;
      const { onTaskFinish, onCardStateChange } = this.props;
      const totalTime = this.state[`total${type}Time`];
      const elapsedTime = this.state[`elapsed${type}Time`];
      const remainingTime = this.state[`remaining${type}Time`];
      const overallTime = elapsedTaskTime + elapsedBreakTime;

      const now = Date.now();
      const elapsedTimeArray = getTimeArray(elapsedTime);
      const totalTimeArray = getTimeArray(totalTime);
      const remainingTimeArray = getTimeArray(remainingTime);
      const overallTimeArray = getTimeArray(overallTime);
      const elapsedPercent = (elapsedTime / totalTime) * 100;
      const remainingPercent = (remainingTime / totalTime) * 100;

      // when task time finishes
      if (elapsedTime >= totalTime) {
        this.setState({
          [`is${type}TimeActive`]: false,
          [`elapsed${type}Time`]: totalTime,
          [`elapsed${type}TimeArray`]: totalTimeArray,
          [`remaining${type}TimeArray`]: ['00', '00', '00'],
          [`elapsed${type}Percent`]: 100,
          [`remaining${type}Time`]: 0,
          [`remaining${type}Percent`]: 0,
          [`is${type}Finished`]: true,
          isStopAlertVisible: false,
          isFinishVisible: true,
          overallTime,
          overallTimeArray,
        });
        onCardStateChange({ [`is${type}TimeActive`]: false });
        // update app state
        onTaskFinish({ elapsedTaskTime, elapsedBreakTime });
        // normal task time tick
      } else {
        this.setState({
          previousTime: now,
          [`elapsed${type}Time`]: elapsedTime + (now - previousTime),
          [`elapsed${type}TimeArray`]: elapsedTimeArray,
          [`remaining${type}Time`]: totalTime - elapsedTime,
          [`remaining${type}TimeArray`]: remainingTimeArray,
          [`elapsed${type}Percent`]: elapsedPercent,
          [`remaining${type}Percent`]: remainingPercent,
        });
      }
    }
  };

  render() {
    const { taskName, isTaskTimeActive, isBreakTimeActive } = this.props.state;

    const {
      isTimerVisible,
      isStopAlertVisible,
      isTaskTimeElapsedMode,
      isBreakTimeElapsedMode,
      isTaskFinished,
      isBreakFinished,
      elapsedTaskPercent,
      elapsedTaskTimeArray,
      elapsedBreakPercent,
      elapsedBreakTimeArray,
      remainingTaskPercent,
      remainingTaskTimeArray,
      remainingBreakPercent,
      remainingBreakTimeArray,
      totalBreaks,
    } = this.state;

    const { id, onTaskRemove, cardRotatingMode, onCardStateChange } =
      this.props;

    const timerClass = classNames('Timer', {
      'Timer--visible': isTimerVisible,
      'Timer--taskTime': isTaskTimeActive || isTaskFinished,
      'Timer--breakTime': isBreakTimeActive || isBreakFinished,
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
            isCountdownVisible={isTaskTimeActive || isTaskFinished}
            totalBreaks={totalBreaks}
          />
          {/* BREAK TIME COUNTDOWN */}
          <Countdown
            modifier="breakTime"
            isElapsedMode={isBreakTimeElapsedMode}
            elapsedTimeArray={elapsedBreakTimeArray}
            remainingTimeArray={remainingBreakTimeArray}
            elapsedTaskPercent={elapsedBreakPercent}
            remainingTaskPercent={remainingBreakPercent}
            isCountdownVisible={isBreakTimeActive || isBreakFinished}
            totalBreaks={totalBreaks}
          />
        </div>
        {/* BREAKS COUNTER */}
        <p className="Timer__breaks">{breaksAmount(totalBreaks)}</p>
        {/* CONTROL BUTTONS */}
        <Controls
          isTaskTimeActive={isTaskTimeActive}
          isBreakTimeActive={isBreakTimeActive}
          cardRotatingMode={cardRotatingMode}
          onCardStateChange={onCardStateChange}
          onDisplayModeChange={this.handleTimeDisplayMode}
          onTimerStateChange={this.handleStateChange}
          onStopButtonClick={this.handleAlertVisibility}
        />
        {/* PROGRESS BAR */}
        <div className="Timer__progress">
          <Progress
            modifier="taskTime"
            isVisible={isTaskTimeActive || isTaskFinished}
            isElapsedMode={isTaskTimeElapsedMode}
            elapsedPercent={elapsedTaskPercent}
            remainingPercent={remainingTaskPercent}
          />
          <Progress
            modifier="breakTime"
            isVisible={isBreakTimeActive || isBreakFinished}
            isElapsedMode={isBreakTimeElapsedMode}
            elapsedPercent={elapsedBreakPercent}
            remainingPercent={remainingBreakPercent}
          />
        </div>
        {/* STOP TASK SECTION */}
        <StopAlert
          alertText="Do you really want to stop this task?"
          isStopAlertVisible={isStopAlertVisible}
          onStopCancel={this.handleAlertVisibility}
          onStopConfirm={this.handleTimerStop}
        />
        {/* TASK TIME EXCEEDED */}
        {isTaskFinished ? (
          <Finish
            isTaskFinished={isTaskFinished}
            taskName={taskName}
            state={this.state}
            onTimerStateChange={this.handleStateChange}
            onTaskRemove={onTaskRemove}
            onTimerRestart={this.handleTimerStop}
            id={id}
          />
        ) : (
          <div></div>
        )}
        {/* BREAK TIME EXCEEDED */}
        {isBreakFinished ? (
          <Finish
            isTaskFinished={isTaskFinished}
            taskName={taskName}
            state={this.state}
            onTimerStateChange={this.handleStateChange}
            onTaskRemove={onTaskRemove}
            onTimerRestart={this.handleTimerStop}
            id={id}
          />
        ) : (
          <div></div>
        )}
      </section>
    );
  }
}
export default Timer;
