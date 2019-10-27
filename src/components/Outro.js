import React from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Outro.scss';

const Outro = (props) => {
  const {
    taskName,
    breakTimeElapsed,
    breaksTotal,
    breakTimeElapsedArray,
    overallTime,
    overallTimeArray
  } = props.state;

  const [minutes, seconds] = overallTimeArray;
  const [breakMinutes, breakSeconds] = breakTimeElapsedArray;

  const timeResult = (min, sec) => `
    <span className="outro__message--bold">
      ${min > 1 ? `${min} minutes` : min === 1 ? `${min} minute` : ``}
    </span>
      ${min > 0 && (sec === breakSeconds ? breakTimeElapsed !== 0 : sec !== 0)
      ? `and` : ``}
    <span className="outro__message--bold">
      ${sec > 1 ? `${sec} seconds` : sec === 1 ? `${sec} second` : `a split second`}
    </span>`;

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
          <span className="outro__message--bold">
            {`"${taskName}"`}
          </span><br />
          {`
          in ${timeResult(minutes, seconds)}
          ${breakTimeElapsed > 0 ? "including break time." : "."}
          `}
          <br />
          You had
          <span className="outro__message--bold">
            {`
            ${breaksTotal > 1
            ? `${breaksTotal} breaks`
            : breaksTotal === 1 ? `${breaksTotal} break` : "no brakes"}
            `}
          </span>
          during this task
          {`
          ${breaksTotal
            ? `${timeResult(breakMinutes, breakSeconds)} long, what makes it around
              <span className="outro__message--bold">
                ${Math.round(breakTimeElapsed / overallTime * 100)}%
              </span>
              of all time.`
            : `.`}
          `}
        </p>
        <button className="Outro__retry">
          <svg className="Outro__svg" viewBox="0 0 512 512">
            <use href={`${icons}#retry`}/>
          </svg>
        </button>
      </div>
    </section>
  );
}
export default Outro;