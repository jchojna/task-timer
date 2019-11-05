import React, { Component } from 'react';
import icons from '../assets/svg/icons.svg';
import '../scss/Controls.scss';

class Controls extends Component {

  handlePlayPauseButton = () => {
    //const incBreaksTotal = isTaskTimeActive ? breaksTotal + 1 : breaksTotal;
    const {
      isTaskTimeActive,
      isBreakTimeActive,
      onTimerStateChange } = this.props;

    if (isTaskTimeActive || isBreakTimeActive) {
      onTimerStateChange({
        isTaskTimeActive: !isTaskTimeActive,
        isBreakTimeActive: !isBreakTimeActive,
        //breaksTotal: incBreaksTotal,
        previousTime: Date.now()
      });
    }
  }

  handleStopButton = () => {
    const {
      isTaskTimeActive,
      isBreakTimeActive,
      onTaskStateChange,
      onTimerStateChange } = this.props;

    if (isTaskTimeActive || isBreakTimeActive) {
      onTaskStateChange({ isTimerVisible: false });
      onTimerStateChange({
        isTaskTimeActive: false,
        isBreakTimeActive: false,
      });
    }
  }

  handleToggleButton = () => {
    const { onDisplayModeChange } = this.props;
    onDisplayModeChange();
  }
    

  render() {

    const {
      isTaskTimeActive
    } = this.props;
  

    return (
      <div className="Controls">
        {/* PLAY / PAUSE BUTTON */}
        <button
          className="Controls__button Controls__button--playPause"
          onClick={this.handlePlayPauseButton}
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
          onClick={this.handleStopButton}
        >
          <svg className="Controls__svg" viewBox="0 0 512 512">
            <use href={`${icons}#stop`} />
          </svg>
        </button>
  
        {/* TOGGLE BUTTON */}
        <button
          className="Controls__button Controls__button--toggle"
          onClick={this.handleToggleButton}
        >
          <svg className="Controls__svg" viewBox="0 0 512 512">
            <use href={`${icons}#toggle`} />
          </svg>
        </button>
      </div>
    );
  }
}
export default Controls;