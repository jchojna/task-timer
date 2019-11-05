import React, {Component} from 'react';
import TimeDisplay from './TimeDisplay.js';
import Controls from './Controls';
import Break from './Break';
//import Progress from './Progress';
import '../scss/Timer.scss';

class Timer extends Component {
  constructor(props) {
    super(props);
    const { startTime, totalTaskTime, totalBreakTime } = this.props.state;
    this.state = {
      isElapsedMode: true,
      isTaskTimeActive: true,
      isBreakTimeActive: false,
      elapsedTaskTime: 0,
      elapsedBreakTime: 0,
      remainingTaskTime: 0,
      //percentElapsed,
      //percentRemaining
      totalTaskTime,
      totalBreakTime,
      totalBreaks: 0,
      
      elapsedTaskTimeArray: ['00','00','00'],
      elapsedBreakTimeArray: ['00','00','00'],
      remainingTaskTimeArray: ['00','00','00'],


      //breakTimeElapsed: 0,
      previousTime: startTime,
      //percentElapsed: 0,
      //percentRemaining: 100,
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
      const { onTimeArrayChange, onTaskStateChange } = this.props;

      const now = Date.now();



      const elapsedTaskTimeArray = onTimeArrayChange(elapsedTaskTime);
      //const taskTimeTotalResult = onTimeArrayChange(taskTimeTotal);
      const remainingTaskTimeArray = onTimeArrayChange(remainingTaskTime);
      //const overallTimeResult = onTimeArrayChange(taskTimeElapsed + breakTimeElapsed);
      //const percentElapsed = taskTimeElapsed / taskTimeTotal * 100;
      //const percentRemaining = taskTimeRemaining / taskTimeTotal * 100;

      // when task time finishes
      if (elapsedTaskTime >= totalTaskTime) {
        this.setState({
          /* isStopTaskVisible: false,
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
          overallTimeArray: overallTimeResult */
        });
      // normal task time tick
      } else {
        this.setState({
          previousTime: now,
          elapsedTaskTime: elapsedTaskTime + (now - previousTime),
          elapsedTaskTimeArray,
          remainingTaskTime: totalTaskTime - elapsedTaskTime,
          remainingTaskTimeArray,
          //percentElapsed: percentElapsed,
          //percentRemaining: percentRemaining
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

      const { onTimeArrayChange, onTaskStateChange } = this.props;

      const now = Date.now();
      const elapsedBreakTimeArray = onTimeArrayChange(elapsedBreakTime);
      //const breakTimeTotalResult = onTimeArrayChange(breakTimeTotal);

      // when break time finishes
      if (elapsedBreakTime >= totalBreakTime) {
        onTaskStateChange({
          /* isBreakTimeActive: false,
          isTimerVisible: false,
          isFailureVisible: true,
          overallTime: taskTimeElapsed + breakTimeElapsed,
          breakTimeElapsed: breakTimeTotal,
          breakTimeElapsedArray: breakTimeTotalResult */
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
      remainingTaskTimeArray,
      elapsedBreakTimeArray,
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

          <div className={`Timer__display`}>
            <TimeDisplay
              className={isElapsedMode
              ? "TimeDisplay TimeDisplay--visible TimeDisplay--showUp"
              : "TimeDisplay TimeDisplay--hideUp"}
              timeArray={elapsedTaskTimeArray}
            />
            <TimeDisplay
              className={isElapsedMode
              ? "TimeDisplay TimeDisplay--hideUp"
              : "TimeDisplay TimeDisplay--visible TimeDisplay--showUp"}
              timeArray={remainingTaskTimeArray}
            />
          </div>

          {/* BREAK */}
          <Break
            compClassName={`Break ${isBreakTimeActive
            ? "Break--active" : ""}`}
            totalBreaks={totalBreaks}
            elapsedBreakTimeArray={elapsedBreakTimeArray}
          />
          {/* PROGRESS */}
          {/* <Progress
            isElapsedMode={isElapsedMode}
            percentElapsed={percentElapsed}
            percentRemaining={percentRemaining}
          /> */}
        </div>
      </section>
    );
  }
}
export default Timer;