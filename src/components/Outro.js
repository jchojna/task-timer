import React from 'react';
import TimeResult from './TimeResult';
import icons from '../assets/svg/icons.svg';
import '../scss/Outro.scss';

const Outro = (props) => {
  const {
    taskName,
    breaksTotal,
    breakTimeElapsed,
    breakTimeElapsedArray,
    overallTime,
    overallTimeArray
  } = props.state;

  const [minutes, seconds] = overallTimeArray;
  const [breakMinutes, breakSeconds] = breakTimeElapsedArray;

  return (
    <section className={props.compClassName}>
      <div className="Outro__container">
        <h2 className="Outro__heading">
          Congratulations!
          <span
            className="Outro__party"
            role="img"
            aria-label="party"
          > 🎉</span>
        </h2>
        <p className="Outro__message">
          You have finished your task entitled <br />
          <span className="TimeResult">
            {`"${taskName}"`}
          </span><br />
          in
          <TimeResult
            minutes={parseInt(minutes)}
            seconds={parseInt(seconds)}
            breakTimeElapsed={breakTimeElapsed}
          />
          {`${breakTimeElapsed > 0 ? " including break time." : "."}`}
          <br />
          You had
          <span className="TimeResult">
            {`
            ${breaksTotal > 1
            ? `${breaksTotal} breaks`
            : breaksTotal === 1 ? `${breaksTotal} break` : "no brakes"}
            `}
          </span>
          during this task
          <TimeResult
            minutes={parseInt(breakMinutes)}
            seconds={parseInt(breakSeconds)}
            breakTimeElapsed={breakTimeElapsed}
            breakFlag={true}
          />
          {breaksTotal ? " long, what makes it around" : ""}
          <span className="TimeResult">
            { breaksTotal
              ? ` ${Math.round(breakTimeElapsed / overallTime * 100)}%`
              : ""}
          </span>
          {breaksTotal ? " of all time." : "."}
        </p>
        <button
          className="Outro__retry"
          onClick={() => props.changeState({
            isOutroVisible: false,
            isTaskVisible: true,
            taskName: "",
            isTaskNameValid: false,
            taskTimePlanned: "",
            isTaskTimePlannedValid: false
          })}
        >
          <svg className="Outro__svg" viewBox="0 0 512 512">
            <use href={`${icons}#retry`}/>
          </svg>
        </button>
      </div>
    </section>
  );
}
export default Outro;