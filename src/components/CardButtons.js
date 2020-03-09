import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/CardButtons.scss';

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
    onDrag
  } = props;

  const handleMaximize = () => {
    onTaskStateChange(prevState => ({
      isMaximized: !prevState.isMaximized
    }));
    onBoardStateChange({ isPlaceholderVisible: false });
  }

  const cardButtonsClass = classNames("CardButtons", {
    "CardButtons--maximized": isMaximized
  });

  const acceptButtonClass = classNames("CardButtons__button",
  "CardButtons__button--accept", {
    "CardButtons__button--visible": editModeActive,
    "CardButtons__button--disabled": inputInvalid || cardRotatingMode
  });

  const buttonClass = classNames("CardButtons__button", {
    "CardButtons__button--disabled": editModeActive || cardRotatingMode,
    "CardButtons__button--visible": isMaximized
  });
  
  return (
    <div className={cardButtonsClass}>
      {/* ACCEPT BUTTON */}
      <button
        className={acceptButtonClass}
        onClick={onAcceptButtonClick}
      >
        <svg className="CardButtons__svg" viewBox="0 0 512 512">
          <use href={`${icons}#tick`}/>
        </svg>
      </button>

      {/* MINIMIZE BUTTON */}
      <button
        className={buttonClass}
        onClick={handleMaximize}
        disabled={editModeActive || cardRotatingMode}
      >
        <svg className="CardButtons__svg" viewBox="0 0 512 512">
          <use href={`${icons}#minimize`}/>
        </svg>
      </button>

      {/* DRAG BUTTON */}
      <button
        className={buttonClass}
        onMouseDown={onDrag}
        disabled={editModeActive || cardRotatingMode}
      >
        <svg className="CardButtons__svg" viewBox="0 0 100 100">
          <use href={`${icons}#drag`}/>
        </svg>
      </button>
      
      {/* REMOVE BUTTON */}
      <button
        className={buttonClass}
        onClick={onRemoveButtonClick}
        disabled={editModeActive || cardRotatingMode}
      >
        <svg className="CardButtons__svg" viewBox="0 0 512 512">
          <use href={`${icons}#remove`}/>
        </svg>
      </button>
    </div>
  );
}
export default CardButtons;