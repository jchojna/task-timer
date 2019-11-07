import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/Finish.scss';

const Finish = (props) => {

  const {
    isFinishVisible,
    totalBreaks,
    elapsedBreakTime,
    elapsedBreakTimeArray,
    overallTime,
    overallTimeArray
  } = props.state;

  const getTimeResult = ([minutes, seconds], elapsedBreakTime) => {
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
  const { taskName, onStateChange } = props;
  const breaksAmount = totalBreaks > 1
    ? ` ${totalBreaks} breaks `
    : totalBreaks === 1 ? ` ${totalBreaks} break ` : " no brakes ";
  const breakPercent = totalBreaks
    ? ` ${Math.round(elapsedBreakTime / overallTime * 100)}%`
    : "";
  const overallTimeResult = getTimeResult(overallTimeArray);
  const breakTimeResult = getTimeResult(elapsedBreakTimeArray, elapsedBreakTime);
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

      {/* RETRY BUTTON */}
      <button
        className="Finish__retry"
        /* onClick={() => onStateChange({
          isOutroVisible: false,
          isTaskVisible: true,
          taskName: "",
          isTaskNameValid: false,
          taskTimePlanned: "",
          isTaskTimePlannedValid: false,
          breakTimePlanned: "",
          isBreakTimePlannedValid: false
        })} */
      >
        <svg className="Finish__svg" viewBox="0 0 512 512">
          <use href={`${icons}#retry`}/>
        </svg>
      </button>
    </section>
  );
}
export default Finish;