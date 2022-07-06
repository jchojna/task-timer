import React, { Component } from 'react';
import classNames from 'classnames';
import icons from 'assets/svg/icons.svg';
import 'scss/Controls.scss';

class Controls extends Component {
  handlePlayPauseButton = () => {
    const {
      isTaskTimeActive,
      isBreakTimeActive,
      onTimerStateChange,
      onCardStateChange,
    } = this.props;

    if (isTaskTimeActive || isBreakTimeActive) {
      onCardStateChange((prevState) => ({
        isTaskTimeActive: !prevState.isTaskTimeActive,
        isBreakTimeActive: !prevState.isBreakTimeActive,
      }));
      onTimerStateChange({ previousTime: Date.now() });
    }
    if (isTaskTimeActive) {
      onTimerStateChange((prevState) => ({
        totalBreaks: prevState.totalBreaks + 1,
      }));
    }
  };

  render() {
    const {
      isTaskTimeActive,
      onStopButtonClick,
      cardRotatingMode,
      onDisplayModeChange,
    } = this.props;

    const svgPlayClass = classNames('Controls__svg', {
      'Controls__svg--hidden': isTaskTimeActive,
    });
    const svgPauseClass = classNames('Controls__svg', {
      'Controls__svg--hidden': !isTaskTimeActive,
    });

    const playPauseButtonClass = classNames(
      'Controls__button',
      'Controls__button--playPause',
      {
        'Controls__button--disabled': cardRotatingMode,
      }
    );

    const stopButtonClass = classNames(
      'Controls__button',
      'Controls__button--stop',
      {
        'Controls__button--disabled': cardRotatingMode,
      }
    );

    const toggleButtonClass = classNames(
      'Controls__button',
      'Controls__button--toggle',
      {
        'Controls__button--disabled': cardRotatingMode,
      }
    );

    return (
      <div className="Controls">
        {/* PLAY / PAUSE BUTTON */}
        <button
          className={playPauseButtonClass}
          onClick={this.handlePlayPauseButton}
          disabled={cardRotatingMode}
        >
          <svg className={svgPlayClass} viewBox="0 0 100 100">
            <use href={`${icons}#play`} />
          </svg>
          <svg className={svgPauseClass} viewBox="0 0 100 100">
            <use href={`${icons}#pause`} />
          </svg>
        </button>

        {/* STOP BUTTON */}
        <button
          className={stopButtonClass}
          onClick={onStopButtonClick}
          disabled={cardRotatingMode}
        >
          <svg className="Controls__svg" viewBox="0 0 100 100">
            <use href={`${icons}#stop`} />
          </svg>
        </button>

        {/* TOGGLE BUTTON */}
        <button
          className={toggleButtonClass}
          onClick={onDisplayModeChange}
          disabled={cardRotatingMode}
        >
          <svg className="Controls__svg" viewBox="0 0 100 100">
            <use href={`${icons}#toggle`} />
          </svg>
        </button>
      </div>
    );
  }
}
export default Controls;
