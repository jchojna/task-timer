import React from 'react';
import TimeResult from './TimeResult';
import icons from '../assets/svg/icons.svg';
import '../scss/Outro&Failure.scss';

const Failure = (props) => {
  const { compClassName, onStateChange, state } = props;

  const {
    breaksTotal,
    breakTimeElapsed,
    breakTimeElapsedArray,
    overallTime
  } = state;
  
  const [breakMinutes, breakSeconds] = breakTimeElapsedArray;

  return (
    <section className={compClassName}>
      <div className="Failure__container">
        <h2 className="Failure__heading">
          Too long break!
          <span
            className="Failure__emoji"
            role="img"
            aria-label="fail"
          > 😮</span>
        </h2>
        <p className="Failure__message">
          It seems you exceeded the limit of break time! <br />

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
          {breaksTotal ? " of all time." : "."} <br />
          But don't give up, try again!
        </p>
        <button
          className="Failure__retry"
          onClick={() => onStateChange({
            isFailureVisible: false,
            isTaskVisible: true,
            taskName: "",
            isTaskNameValid: false,
            taskTimePlanned: "",
            isTaskTimePlannedValid: false,
            breakTimePlanned: "",
            isBreakTimePlannedValid: false
          })}
        >
          <svg className="Failure__svg" viewBox="0 0 512 512">
            <use href={`${icons}#retry`}/>
          </svg>
        </button>
      </div>
    </section>
  );
}
export default Failure;