import React, { Component } from 'react';
import { formatTimeResult } from '../lib/handlers';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/Finish.scss';

class Finish extends Component {

  handleRestartTask = () => {
    const { onTaskStateChange } = this.props;
    onTaskStateChange({
      isTimerVisible: false
    });
  }

  render() {

    const { taskName, isTaskFinished, onTaskRemove, id } = this.props;
    const {
      isFinishVisible,
      totalBreaks,
      elapsedBreakTime,
      elapsedBreakTimeArray,
      overallTime,
      overallTimeArray
    } = this.props.state;
  
    const breaksAmount = totalBreaks > 1
      ? ` ${totalBreaks} breaks `
      : totalBreaks === 1 ? ` ${totalBreaks} break ` : " no brakes ";

    const breakPercent = totalBreaks
      ? ` ${Math.round(elapsedBreakTime / overallTime * 100)}%`
      : "";

    const overallTimeResult = formatTimeResult(overallTimeArray);
    const breakTimeResult = formatTimeResult(elapsedBreakTimeArray, elapsedBreakTime);
    const finishClass = classNames("Finish", {
      "Finish--visible": isFinishVisible,
      [`Finish--task`]: isTaskFinished,
      [`Finish--break`]: !isTaskFinished
    });

    return (
      <section className={finishClass}>
  
        {/* FINISH HEADING */}
        { isTaskFinished
          ?
          <h2 className="Finish__heading">
            Time is up!
            <span className="Finish__emoji" role="img" aria-label="party"> 🎉</span>
          </h2>
          :
          <h2 className="Finish__heading">
            Too long break!
            <span className="Finish__emoji" role="img" aria-label="party"> 🙁</span>
          </h2>
        }
        {/* TASK FINISHED MESSAGE */}
        { isTaskFinished
          ?
          <p className="Finish__message">
            You have finished your task: <br />
            <span className="Finish__accent">{`"${taskName}"`}</span><br />
            in
            <span className="Finish__accent">{overallTimeResult}</span>
            {`${elapsedBreakTime > 0 ? " including break time." : "."}`} <br />
            You had
            <span className="Finish__accent">{breaksAmount}</span>
            during this task
            <span className="Finish__accent">{breakTimeResult}</span>
            {totalBreaks ? " long, what makes it around" : ""}
            <span className="Finish__accent">{breakPercent}</span>
            {totalBreaks ? " of all time." : "."}
          </p>
          :
          <p className="Finish__message">
            You spent too much time on breaks! <br />
            You had
            <span className="Finish__accent">{breaksAmount}</span>
            during this task
            <span className="Finish__accent">{breakTimeResult}</span>
            {totalBreaks ? " long, what makes it around" : ""}
            <span className="Finish__accent">{breakPercent}</span>
            {totalBreaks ? " of all time." : "."}
          </p>
        }
        {/* RESTART BUTTON */}
        <button
          className="Finish__button Finish__button--restart"
          onClick={this.handleRestartTask}
        >
          <svg className="Finish__svg" viewBox="0 0 512 512">
            <use href={`${icons}#retry`}/>
          </svg>
        </button>

        {/* REMOVE BUTTON */}
        <button
          className="Finish__button Finish__button--remove"
          onClick={() => onTaskRemove(id)}
        >
          <svg className="Task__svg" viewBox="0 0 512 512">
            <use href={`${icons}#remove`}/>
          </svg>
        </button>
      </section>
    );
  }
}
export default Finish;