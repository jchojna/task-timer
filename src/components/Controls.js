import React, { Component } from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/Controls.scss';

class Controls extends Component {

  handlePlayPauseButton = () => {
    const {
      isTaskTimeActive,
      isBreakTimeActive,
      onTimerStateChange } = this.props;

    if (isTaskTimeActive || isBreakTimeActive) {
      onTimerStateChange(prevState => ({
        isTaskTimeActive: !prevState.isTaskTimeActive,
        isBreakTimeActive: !prevState.isBreakTimeActive,
        previousTime: Date.now()
      }));
    }
    if (isTaskTimeActive) {
      onTimerStateChange(prevState => ({
        totalBreaks: prevState.totalBreaks + 1
      }));
    }
  }

  handleStopButton = () => {
    const {
      isTaskTimeActive,
      isBreakTimeActive,
      onTimerStateChange } = this.props;

    if (isTaskTimeActive || isBreakTimeActive) {
      onTimerStateChange({ isStopTimerVisible: true });
    }
  }

  handleToggleButton = () => this.props.onDisplayModeChange();

  render() {

    const { isTaskTimeActive } = this.props;
    const svgPlayClass = classNames("Controls__svg", {
      "Controls__svg--hidden": isTaskTimeActive
    });
    const svgPauseClass = classNames("Controls__svg", {
      "Controls__svg--hidden": !isTaskTimeActive
    });

    return (
      <div className="Controls">
        {/* PLAY / PAUSE BUTTON */}
        <button
          className="Controls__button Controls__button--playPause"
          onClick={this.handlePlayPauseButton}
        >
          <svg className={svgPlayClass} viewBox="0 0 512 512">
            <use href={`${icons}#play`} />
          </svg>
          <svg className={svgPauseClass} viewBox="0 0 512 512">
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