import React, { Component } from 'react';
import classNames from 'classnames';
import EditableText from './EditableText.js';
import TotalTime from './TotalTime.js';
import Timer from './Timer.js';
import { validateTaskName, handleTimeChange } from '../lib/handlers';
import { cardFlipTime } from '../lib/globalVariables';
import icons from '../assets/svg/icons.svg';
import '../scss/Task.scss';

class Task extends Component {
  constructor(props) {
    super(props);
    const {
      taskName,
      totalTaskTime,
      totalBreakTime,
      totalTaskTimeArray,
      totalBreakTimeArray,
    } = this.props.task;

    this.state = {
      isCardFlippedMode: false,
      isTimerAppended: false,
      taskName,
      taskMinutes: totalTaskTimeArray[0],
      taskSeconds: totalTaskTimeArray[1],
      breakMinutes: totalBreakTimeArray[0],
      breakSeconds: totalBreakTimeArray[1],
      totalTaskTime,
      totalBreakTime,
      totalTaskTimeArray,
      totalBreakTimeArray,
      isTaskNameEditMode: false,
      isTaskTimeEditMode: false,
      isBreakTimeEditMode: false,
      isTaskNameValid: true,
      isTaskTimeValid: true,
      isBreakTimeValid: true
    }
  }
  
  handleStateChange = (object) => this.setState(object);

  handleTaskNameChange = (value) => {
    this.setState({
      taskName: value,
      isTaskNameValid: validateTaskName(value)
    });
  }

  handleTaskRemove = (id) => {
    const { onTaskRemove } = this.props;
    onTaskRemove(id);
  }

  acceptEditChange = () => {
    const {
      totalTaskTimeArray,
      totalBreakTimeArray,
      isTaskNameValid,
      isTaskTimeValid,
      isBreakTimeValid
    } = this.state;
    const [ taskMinutes, taskSeconds ] = totalTaskTimeArray;
    const [ breakMinutes, breakSeconds ] = totalBreakTimeArray;

    if (isTaskNameValid && isTaskTimeValid && isBreakTimeValid) {
      this.setState({
        isTaskNameEditMode: false,
        isTaskTimeEditMode: false,
        isBreakTimeEditMode: false,
        taskMinutes,
        taskSeconds,
        breakMinutes,
        breakSeconds,
      });
    }
  }

  handleTimeChange = (minutes, seconds, units, type) => {
    const object = handleTimeChange(minutes, seconds, units, type);

    if (type === 'task') {
      if (units === 'minutes') {
        const {
          taskMinutes, totalTaskTime, totalTaskTimeArray, isTaskTimeValid
        } = object;
        this.setState({
          taskMinutes, totalTaskTime, totalTaskTimeArray, isTaskTimeValid
        });
      } else if (units === 'seconds') {
        const {
          taskSeconds, totalTaskTime, totalTaskTimeArray, isTaskTimeValid
        } = object;
        this.setState({
          taskSeconds, totalTaskTime, totalTaskTimeArray, isTaskTimeValid
        });
      }
    } else if (type === 'break') {
      if (units === 'minutes') {
        const {
          breakMinutes, totalBreakTime, totalBreakTimeArray, isBreakTimeValid
        } = object;
        this.setState({
          breakMinutes, totalBreakTime, totalBreakTimeArray, isBreakTimeValid
        });
      } else if (units === 'seconds') {
        const {
          breakSeconds, totalBreakTime, totalBreakTimeArray, isBreakTimeValid
        } = object;
        this.setState({
          breakSeconds, totalBreakTime, totalBreakTimeArray, isBreakTimeValid
        });
      }
    }
    //this.setState({ alertTimeFlag });
  }

  handleStartButton = () => this.setState({
    isCardFlippedMode: true,
    isTimerAppended: true
  });

  render() {

    const { id } = this.props;
    const {
      isCardFlippedMode,
      taskName,
      taskMinutes,
      taskSeconds,
      breakMinutes,
      breakSeconds,
      isTaskNameEditMode,
      isTaskTimeEditMode,
      isBreakTimeEditMode,
      isTaskNameValid,
      isTaskTimeValid,
      isBreakTimeValid
    } = this.state;

    const isEditMode = isTaskNameEditMode || isTaskTimeEditMode || isBreakTimeEditMode;

    const taskContainerClass = classNames("Task__container", {
      "Task__container--editMode": isEditMode,
      "Task__container--flipped": isCardFlippedMode
    });

    const taskContainerStyle = { transitionDuration: `${cardFlipTime}ms` }

    const acceptButtonClass = classNames("button Task__button Task__button--accept", {
      "Task__button--visible": isEditMode
    });

    const removeButtonClass = classNames("button Task__button Task__button--remove", {
      "Task__button--disabled": isEditMode
    });

    const startButtonClass = classNames("button Task__button Task__button--start", {
      "Task__button--disabled": isEditMode
    });   
    

    return (
      <section className="Task">
        <div
          className={taskContainerClass}
          style={taskContainerStyle}
        >
          {/* TASK  NAME */}
          <EditableText
            output={taskName}
            isValid={isTaskNameValid}
            isDisabled={isTaskTimeEditMode || isBreakTimeEditMode}
            isEditMode={isTaskNameEditMode}
            onEditModeChange={() => this.setState({ isTaskNameEditMode: true })}
            onTaskNameChange={this.handleTaskNameChange}
          />

          {/* TOTAL TASK TIME */}
          <TotalTime
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
          />
          
          {/* TOTAL BREAK TIME */}
          <TotalTime
            labelName="Break Time"
            modifier="breakTime"
            id={id}
            minutes={breakMinutes}
            seconds={breakSeconds}
            isValid={isBreakTimeValid}
            isDisabled={isTaskNameEditMode || isTaskTimeEditMode}
            onEditModeChange={() => this.setState({ isBreakTimeEditMode: true })}
            isEditMode={isBreakTimeEditMode}
            onMinutesChange={(value) => 
              this.handleTimeChange(value, breakSeconds, 'minutes', 'break')}
            onSecondsChange={(value) => 
              this.handleTimeChange(breakMinutes, value, 'seconds', 'break')}
          />
                  
          {/* EDIT BUTTONS */}
          <div className="Task__buttons">
            {/* ACCEPT */}
            <button
              className={acceptButtonClass}
              onClick={this.acceptEditChange}
            >
              <svg className="Task__svg" viewBox="0 0 512 512">
                <use href={`${icons}#tick`}/>
              </svg>
            </button>
            {/* REMOVE */}
            <button
              className={removeButtonClass}
              onClick={() => this.handleTaskRemove(id)}
              disabled={isEditMode}
            >
              <svg className="Task__svg" viewBox="0 0 512 512">
                <use href={`${icons}#remove`}/>
              </svg>
            </button>
          </div>
          {/* START BUTTON */}
          <button
            className={startButtonClass}
            disabled={isEditMode}
            onClick={this.handleStartButton}
          >
            <svg className="Task__svg" viewBox="0 0 512 512">
              <use href={`${icons}#play`} />
            </svg>
          </button>
          
          {/* TIMER COMPONENT */}
          {
            this.state.isTimerAppended
            ? <Timer
                onTaskStateChange={this.handleStateChange}
                state={this.state}
                id={id}
                onTaskRemove={this.handleTaskRemove}
              />
            : <div className="empty"></div>
          }
        </div>
      </section>
    );
  }
}
export default Task;