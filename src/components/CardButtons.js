import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/CardButtons.scss';

const CardButtons = (props) => {

  const {
    editModeActive,
    inputInvalid,
    cardRotatingMode,
    onAcceptButtonClick,
    onRemoveButtonClick
  } = props;

  const acceptButtonClass = classNames("button Task__button Task__button--accept", {
    "Task__button--visible": editModeActive,
    "Task__button--disabled": inputInvalid || cardRotatingMode
  });

  const minimizeButtonClass = classNames("button Task__button Task__button--minimize", {
    "Task__button--disabled": editModeActive || cardRotatingMode
  });

  const maximizeButtonClass = classNames("button Task__button Task__button--maximize", {
    "Task__button--disabled": editModeActive || cardRotatingMode
  });

  const removeButtonClass = classNames("button Task__button Task__button--remove", "Task__button--visible", {
    "Task__button--disabled": editModeActive || cardRotatingMode
  });
  
  return (
    <div className="CardButtons">
      {/* ACCEPT */}
      <button
        className={acceptButtonClass}
        onClick={onAcceptButtonClick}
      >
        <svg className="Task__svg" viewBox="0 0 512 512">
          <use href={`${icons}#tick`}/>
        </svg>
      </button>

      <div>
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
      
      {/* REMOVE */}
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