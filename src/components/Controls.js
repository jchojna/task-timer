import React from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Controls.scss';

const Controls = (props) => {
  const {
    isTaskTimeActive,
    isBreakTimeActive,
    changeDisplayMode,
    changeState,
    breaksTotal
  } = props;
  const incBreaksTotal = isTaskTimeActive
  ? breaksTotal + 1 : breaksTotal;

  return (
    <div className="Controls">
      {/* PLAY / PAUSE BUTTON */}
      <button
        className="Controls__button Controls__button--playPause"
        onClick={isTaskTimeActive || isBreakTimeActive
          ? () => changeState({
          isTaskTimeActive: !isTaskTimeActive,
          isBreakTimeActive: !isBreakTimeActive,
          breaksTotal: incBreaksTotal,
          previousTime: Date.now() })
          : false }
      >
        <svg
          className={`Controls__svg ${isTaskTimeActive
            ? "Controls__svg--hidden" : ""}`}
          viewBox="0 0 512 512"
        >
          <use href={`${icons}#play`} />
        </svg>
        <svg
          className={`Controls__svg ${isTaskTimeActive
            ? "" : "Controls__svg--hidden"}`}
          viewBox="0 0 512 512"
        >
          <use href={`${icons}#pause`} />
        </svg>
      </button>

      {/* STOP BUTTON */}
      <button
        className="Controls__button Controls__button--stop"
        onClick={isTaskTimeActive
          ? () => changeState({ isStopTaskVisible: true })
          : false }
      >
        <svg className="Controls__svg" viewBox="0 0 512 512">
          <use href={`${icons}#stop`} />
        </svg>
      </button>

      {/* TOGGLE BUTTON */}
      <button
        className="Controls__button Controls__button--toggle"
        onClick={() => changeDisplayMode()}
      >
        <svg className="Controls__svg" viewBox="0 0 512 512">
          <use href={`${icons}#toggle`} />
        </svg>
      </button>
    </div>
  );
}
export default Controls;