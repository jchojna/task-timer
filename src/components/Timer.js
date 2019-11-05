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
      taskTimeElapsed: 0,
      breakTimeElapsed: 0,
      taskTimeRemaining: 0,
      //percentElapsed,
      //percentRemaining
      totalTaskTime,
      totalBreakTime,
      totalBreaks: 0,
      
      taskTimeElapsedArray: ['00','00','00'],
      taskTimeRemainingArray: ['00','00','00'],
      breakTimeElapsedArray: ['00','00','00'],


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
        taskTimeElapsed,
        taskTimeRemaining,
        previousTime
      } = this.state;
      const { onTimeArrayChange, onTaskStateChange } = this.props;

      const now = Date.now();



      const taskTimeElapsedArray = onTimeArrayChange(taskTimeElapsed);
      //const taskTimeTotalResult = onTimeArrayChange(taskTimeTotal);
      const taskTimeRemainingArray = onTimeArrayChange(taskTimeRemaining);
      //const overallTimeResult = onTimeArrayChange(taskTimeElapsed + breakTimeElapsed);
      //const percentElapsed = taskTimeElapsed / taskTimeTotal * 100;
      //const percentRemaining = taskTimeRemaining / taskTimeTotal * 100;

      // when task time finishes
      if (taskTimeElapsed >= totalTaskTime) {
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
          taskTimeElapsed: taskTimeElapsed + (now - previousTime),
          taskTimeElapsedArray,
          taskTimeRemaining: totalTaskTime - taskTimeElapsed,
          taskTimeRemainingArray,
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
        breakTimeElapsed,
        previousTime
      } = this.state;

      const { onTimeArrayChange, onTaskStateChange } = this.props;

      const now = Date.now();
      const breakTimeElapsedArray = onTimeArrayChange(breakTimeElapsed);
      //const breakTimeTotalResult = onTimeArrayChange(breakTimeTotal);

      // when break time finishes
      if (breakTimeElapsed >= totalBreakTime) {
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
          breakTimeElapsed: breakTimeElapsed + (now - previousTime),
          breakTimeElapsedArray
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
      taskTimeElapsedArray,
      taskTimeRemainingArray,
      breakTimeElapsedArray,
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
              timeArray={taskTimeElapsedArray}
            />
            <TimeDisplay
              className={isElapsedMode
              ? "TimeDisplay TimeDisplay--hideUp"
              : "TimeDisplay TimeDisplay--visible TimeDisplay--showUp"}
              timeArray={taskTimeRemainingArray}
            />
          </div>

          {/* BREAK */}
          <Break
            compClassName={`Break ${isBreakTimeActive
            ? "Break--active" : ""}`}
            totalBreaks={totalBreaks}
            breakTimeElapsedArray={breakTimeElapsedArray}
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