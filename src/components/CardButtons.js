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
    onRemoveButtonClick
  } = props;

  const acceptButtonClass = classNames("CardButtons__button",
  "CardButtons__button--accept", {
    "CardButtons__button--visible": editModeActive,
    "CardButtons__button--disabled": inputInvalid || cardRotatingMode
  });

  const minimizeButtonClass = classNames("CardButtons__button",
  "CardButtons__button--minimize", {
    "CardButtons__button--disabled": editModeActive || cardRotatingMode,
    "CardButtons__button--visible": isMaximized
  });

  const maximizeButtonClass = classNames("CardButtons__button",
  "CardButtons__button--maximize", {
    "CardButtons__button--disabled": editModeActive || cardRotatingMode,
    "CardButtons__button--visible": !isMaximized
  });

  const removeButtonClass = classNames("CardButtons__button",
  "CardButtons__button--remove", "CardButtons__button--visible", {
    "CardButtons__button--disabled": editModeActive || cardRotatingMode
  });
  
  return (
    <div className="CardButtons">
      {/* ACCEPT BUTTON */}
      <button
        className={acceptButtonClass}
        onClick={onAcceptButtonClick}
      >
        <svg className="Task__svg" viewBox="0 0 512 512">
          <use href={`${icons}#tick`}/>
        </svg>
      </button>

      <div className="CardButtons__minmax">
        {/* MINIMIZE BUTTON */}
        <button
          className={minimizeButtonClass}
          //onClick={this.handleAlertVisibility}
          //disabled={editModeActive}
        >
          <svg className="Task__svg" viewBox="0 0 512 512">
            <use href={`${icons}#minimize`}/>
          </svg>
        </button>
        {/* MAXIMIZE BUTTON */}
        <button
          className={maximizeButtonClass}
          //onClick={this.handleAlertVisibility}
          //disabled={editModeActive}
        >
          <svg className="Task__svg" viewBox="0 0 512 512">
            <use href={`${icons}#maximize`}/>
          </svg>
        </button>
      </div>
      
      {/* REMOVE BUTTON */}
      <button
        className={removeButtonClass}
        onClick={onRemoveButtonClick}
        disabled={editModeActive || cardRotatingMode}
      >
        <svg className="Task__svg" viewBox="0 0 512 512">
          <use href={`${icons}#remove`}/>
        </svg>
      </button>
    </div>
  );
}
export default CardButtons;