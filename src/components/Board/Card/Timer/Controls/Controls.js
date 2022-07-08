import React, { Component } from 'react';
import classNames from 'classnames';
import icons from 'assets/svg/icons.svg';
import styles from './Controls.module.scss';

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

    const svgPlayClass = classNames(styles.svg, {
      [styles['svg--hidden']]: isTaskTimeActive,
    });
    const svgPauseClass = classNames(styles.svg, {
      [styles['svg--hidden']]: !isTaskTimeActive,
    });

    const playPauseButtonClass = classNames(
      styles.button,
      styles['button--playPause'],
      {
        [styles['button--disabled']]: cardRotatingMode,
      }
    );

    const stopButtonClass = classNames(styles.button, styles['button--stop'], {
      [styles['button--disabled']]: cardRotatingMode,
    });

    const toggleButtonClass = classNames(
      styles.button,
      styles['button--toggle'],
      {
        [styles['button--disabled']]: cardRotatingMode,
      }
    );

    return (
      <div className={styles.container}>
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
          <svg className={styles.svg} viewBox="0 0 100 100">
            <use href={`${icons}#stop`} />
          </svg>
        </button>

        {/* TOGGLE BUTTON */}
        <button
          className={toggleButtonClass}
          onClick={onDisplayModeChange}
          disabled={cardRotatingMode}
        >
          <svg className={styles.svg} viewBox="0 0 100 100">
            <use href={`${icons}#toggle`} />
          </svg>
        </button>
      </div>
    );
  }
}
export default Controls;
