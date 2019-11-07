import React, { Component } from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/Finish.scss';

class Finish extends Component {

  handleTimeResult = ([minutes, seconds], elapsedBreakTime) => {
    minutes = parseInt(minutes);
    seconds = parseInt(seconds);
    return `
      ${ minutes > 1
      ? ` ${minutes} minutes` : minutes === 1
      ? ` ${minutes} minute` : "" }
      ${ minutes > 0 && (elapsedBreakTime ? elapsedBreakTime !== 0 : seconds !== 0)
      ? "and" : "" }
      ${ seconds > 1
      ? ` ${seconds} seconds` : seconds === 1
      ? ` ${seconds} second` : elapsedBreakTime && elapsedBreakTime !== 0
      ? " a split second" : "" }
    `
  }

  handleResetTask = () => {
    const { onTaskStateChange } = this.props;
    onTaskStateChange({
      isTimerVisible: false
    });
  }

  handleRestartTask = () => {
    const { onTimerStateChange } = this.props;
    onTimerStateChange({
      isFinishVisible: false,
      isTaskTimeActive: true,
      //taskName: "",
      //isTaskNameValid: false,
      //taskTimePlanned: "",
      //isTaskTimePlannedValid: false,
      //breakTimePlanned: "",
      //isBreakTimePlannedValid: false
    });
  }

  render() {

    const {
      isFinishVisible,
      totalBreaks,
      elapsedBreakTime,
      elapsedBreakTimeArray,
      overallTime,
      overallTimeArray
    } = this.props.state;
    const { taskName } = this.props;
  
    const breaksAmount = totalBreaks > 1
      ? ` ${totalBreaks} breaks `
      : totalBreaks === 1 ? ` ${totalBreaks} break ` : " no brakes ";
    const breakPercent = totalBreaks
      ? ` ${Math.round(elapsedBreakTime / overallTime * 100)}%`
      : "";
    const overallTimeResult = this.handleTimeResult(overallTimeArray);
    const breakTimeResult = this.handleTimeResult(elapsedBreakTimeArray, elapsedBreakTime);
    const finishClass = classNames("Finish", {
      "Finish--visible": isFinishVisible
    });

    return (
      <section className={finishClass}>
  
        {/* FINISH HEADING */}
        <h2 className="Finish__heading">
          Congratulations!
          <span className="Finish__emoji" role="img" aria-label="party"> 🎉</span>
        </h2>
        
        {/* FINISH MESSAGE */}
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
  
        {/* RESET BUTTON */}
        <button
          className="Finish__reset"
          onClick={this.handleResetTask}
        >
          <svg className="Finish__svg" viewBox="0 0 512 512">
            <use href={`${icons}#retry`}/>
          </svg>
        </button>

        {/* RESTART BUTTON */}
        {/* <button
          className="Finish__reset"
          onClick={this.handleResetTask}
        >
          <svg className="Finish__svg" viewBox="0 0 512 512">
            <use href={`${icons}#retry`}/>
          </svg>
        </button> */}
      </section>
    );
  }
}
export default Finish;