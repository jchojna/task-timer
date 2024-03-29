import React from 'react';
import classNames from 'classnames';
import icons from 'assets/svg/icons.svg';
import styles from './CardButtons.module.scss';

const CardButtons = (props) => {
  const {
    isMaximized,
    editModeActive,
    inputInvalid,
    cardRotatingMode,
    onAcceptButtonClick,
    onRemoveButtonClick,
    onTaskStateChange,
    onBoardStateChange,
    onDrag,
  } = props;

  const handleMaximize = () => {
    onTaskStateChange((prevState) => ({
      isMaximized: !prevState.isMaximized,
    }));
    onBoardStateChange({ isPlaceholderVisible: false });
  };

  const cardButtonsClass = classNames(styles.container, {
    [styles['container--maximized']]: isMaximized,
  });

  const acceptButtonClass = classNames(
    styles.button,
    [styles['button--accept']],
    {
      [styles['button--visible']]: editModeActive,
      [styles['button--disabled']]: inputInvalid || cardRotatingMode,
    }
  );

  const buttonClass = classNames(styles.button, {
    [styles['button--disabled']]: editModeActive || cardRotatingMode,
    [styles['button--visible']]: isMaximized,
  });

  return (
    <div className={cardButtonsClass}>
      {/* ACCEPT BUTTON */}
      <button className={acceptButtonClass} onClick={onAcceptButtonClick}>
        <svg className={styles.svg} viewBox="0 0 512 512">
          <use href={`${icons}#tick`} />
        </svg>
      </button>

      {/* MINIMIZE BUTTON */}
      <button
        className={buttonClass}
        onClick={handleMaximize}
        disabled={editModeActive || cardRotatingMode}
      >
        <svg className={styles.svg} viewBox="0 0 512 512">
          <use href={`${icons}#minimize`} />
        </svg>
      </button>

      {/* DRAG BUTTON */}
      <button
        className={buttonClass}
        onMouseDown={onDrag}
        disabled={editModeActive || cardRotatingMode}
      >
        <svg className={styles.svg} viewBox="0 0 100 100">
          <use href={`${icons}#drag`} />
        </svg>
      </button>

      {/* REMOVE BUTTON */}
      <button
        className={buttonClass}
        onClick={onRemoveButtonClick}
        disabled={editModeActive || cardRotatingMode}
      >
        <svg className={styles.svg} viewBox="0 0 512 512">
          <use href={`${icons}#remove`} />
        </svg>
      </button>
    </div>
  );
};
export default CardButtons;
