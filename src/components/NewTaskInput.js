import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/NewTaskInput.scss';

const NewTaskInput = (props) => {

  const {
    isVisible,
    modifier,
    label,
    placeholder,
    onBackClick,
    onNextClick,
    onTimeChange
  } = props;

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    onBackClick();
  }
  
  const handleNextButtonClick = (e) => {
    e.preventDefault();
    onNextClick();
  }

  const newTaskInputClass = classNames("NewTaskInput", {
    [`NewTaskInput--${modifier}`]: isVisible
  });

  return (
    <div className={newTaskInputClass}>

      {/* INPUT LABEL */}
      <label
        htmlFor={modifier}
        className="NewTaskInput__label"
      >
        {label}
      </label>

      {
        modifier === "taskName"

        ? /* TEXT INPUT */
        <textarea
          id={modifier}
          className="NewTaskInput__text"
          placeholder={placeholder}
        ></textarea>

        : /* TIME INPUT */
        <div className="NewTaskInput__inputs">
          <input
            id={modifier}
            name={`${modifier}Minutes`}
            className="NewTaskInput__input NewTaskInput__input--minutes"
            placeholder="min"
            maxLength="2"
            onChange={(e) => onTimeChange(e.target.value)}
          />
          <span className="NewTaskInput__colon">:</span>
          <input
            name={`${modifier}Seconds`}
            className="NewTaskInput__input NewTaskInput__input--seconds"
            placeholder="sec"
            maxLength="2"
            onChange={(e) => onTimeChange(e.target.value)}
          />
        </div>
      }

          {/* <TotalTime
            labelName="Task Time"
            modifier="taskTime"
            id={id}
            minutes={taskMinutes}
            seconds={taskSeconds}
            isValid={isTaskTimeValid}
            isDisabled={isTaskNameEditMode || isBreakTimeEditMode}
            onEditModeChange={() => this.setState({ isTaskTimeEditMode: true })}
            isEditMode={isTaskTimeEditMode}
            onMinutesChange={(value) => 
              this.handleTimeChange(value, taskSeconds, 'minutes', 'task')}
            onSecondsChange={(value) => 
              this.handleTimeChange(taskMinutes, value, 'seconds', 'task')}
          /> */}

          {/*  
          <EditableTime
            id={`${modifier}-${id}`}
            unit="minutes"
            time={minutes}
            isValid={isValid}
            isEditMode={isEditMode}
            onTimeChange={(value) => onMinutesChange(value)}
            onEditModeChange={onEditModeChange}
          /> */}

      {/* GO BACK BUTTON */}
      <button
        className="NewTaskInput__button NewTaskInput__button--back"
        onClick={handleBackButtonClick}
      >
        <svg className="NewTaskInput__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-left`}></use>
        </svg>
      </button>

      {/* GO NEXT BUTTON */}
      <button
        className="NewTaskInput__button NewTaskInput__button--next"
        onClick={handleNextButtonClick}
      >
        <svg className="NewTaskInput__svg" viewBox="0 0 512 512">
          <use href={`${icons}#arrow-right`}></use>
        </svg>
      </button>
    </div>
  )
}
export default NewTaskInput;