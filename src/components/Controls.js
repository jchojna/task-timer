import React from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Controls.scss';

const Controls = (props) => {
  return (
    <div className="Controls">
      {/* PLAY / PAUSE BUTTON */}
      <button
        className="Controls__button Controls__button--playPause"
        onClick={() => props.changeState({
          isTaskTimeActive: !props.isTaskTimeActive,
          previousTime: Date.now()
        })}
      >
        <svg
          className={`Controls__svg ${props.isTaskTimeActive
            ? "Controls__svg--hidden" : ""}`}
          viewBox="0 0 512 512"
        >
          <use href={`${icons}#play`} />
        </svg>
        <svg
          className={`Controls__svg ${props.isTaskTimeActive
            ? "" : "Controls__svg--hidden"}`}
          viewBox="0 0 512 512"
        >
          <use href={`${icons}#pause`} />
        </svg>
      </button>

      {/* STOP BUTTON */}
      <button className="Controls__button Controls__button--stop">
        <svg className="Controls__svg" viewBox="0 0 512 512">
          <use href={`${icons}#stop`} />
        </svg>
      </button>

      {/* TOGGLE BUTTON */}
      <button
        className="Controls__button Controls__button--toggle"
        onClick={() => props.changeDisplayMode()}
      >
        <svg className="Controls__svg" viewBox="0 0 512 512">
          <use href={`${icons}#toggle`} />
        </svg>
      </button>
    </div>
  );
}
export default Controls;