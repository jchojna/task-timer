import React, { Component } from 'react';
import classNames from 'classnames';
import EditableText from './EditableText.js';
import TotalTime from './TotalTime.js';
import Timer from './Timer.js';
import StopAlert from './StopAlert.js';
import { validateTaskName, handleTimeChange } from '../lib/handlers';
import { cardFlipTime, animationStyle } from '../lib/globalVariables';
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
      isTaskRotatingIn: true,
      isTaskRotatingOut: false,
      isTaskMounted: false,
      isTimerMounted: false,
      isStopAlertVisible: false,
      taskName,
      taskNameLength: taskName.length,
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

  componentDidMount = () => {
    this.setState({ isTaskMounted: true });
    this.timeoutId = setTimeout(() => this.setState({
      isTaskRotatingIn: false
    }), cardFlipTime);
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeoutId);
  }
  
  handleStateChange = (object) => this.setState(object);

  handleTaskNameChange = (value) => {
    this.setState({
      taskName: value,
      taskNameLength: value.length,
      isTaskNameValid: validateTaskName(value)
    });
  }

  handleAlertVisibility = () => {
    this.setState(prevState => ({
      isStopAlertVisible: !prevState.isStopAlertVisible
    }));
  }
  
  handleTaskRemove = () => {
    const { id } = this.props;
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

  handleStartButton = () => {
    this.setState({
      isTaskRotatingOut: true,
      isTimerMounted: true
    });
  }

  handleKeyPress = (key) => {
    const {
      isTaskNameEditMode,
      isTaskTimeEditMode,
      isBreakTimeEditMode
    } = this.state;
    const editModeActive = isTaskNameEditMode || isTaskTimeEditMode || isBreakTimeEditMode;
    
    if (key === "Enter" && editModeActive) this.acceptEditChange();
  }

  render() {

    const { id } = this.props;
    const {
      isTaskMounted,
      isTaskRotatingIn,
      isTaskRotatingOut,
      isStopAlertVisible,
      taskName,
      taskNameLength,
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

    const editModeActive = isTaskNameEditMode || isTaskTimeEditMode || isBreakTimeEditMode;
    const someInvalid = !isTaskNameValid || !isTaskTimeValid || !isBreakTimeValid;
    const cardRotatingMode = isTaskRotatingIn || isTaskRotatingOut;
    const taskNameDisabled = isTaskTimeEditMode || isBreakTimeEditMode || cardRotatingMode;
    const taskTimeDisabled = isTaskNameEditMode || isBreakTimeEditMode || cardRotatingMode;
    const breakTimeDisabled = isTaskNameEditMode || isTaskTimeEditMode || cardRotatingMode;

    const taskContainerClass = classNames("Task__container", {
      "Task__container--visible": isTaskMounted,
      "Task__container--editMode": editModeActive,
      "Task__container--rotateIn": !isTaskRotatingOut && isTaskMounted,
      "Task__container--rotateOut": isTaskRotatingOut && isTaskMounted
    });

    const acceptButtonClass = classNames("button Task__button Task__button--accept", {
      "Task__button--visible": editModeActive,
      "Task__button--disabled": someInvalid || cardRotatingMode
    });

    const maximizeButtonClass = classNames("button Task__button Task__button--maximize", {
      "Task__button--disabled": editModeActive || cardRotatingMode
    });

    const removeButtonClass = classNames("button Task__button Task__button--remove", {
      "Task__button--disabled": editModeActive || cardRotatingMode
    });

    const startButtonClass = classNames("button Task__button Task__button--start", {
      "Task__button--disabled": editModeActive || cardRotatingMode
    });
    
    return (
      <section className="Task">
        <div
          className={taskContainerClass}
          style={animationStyle}
          //draggable="true"
          //onDragStart={(e) => e.dataTransfer.setData('text/plain',null)}
        >
          {/* TASK  NAME */}
          <EditableText
            output={taskName}
            isValid={isTaskNameValid}
            taskNameLength={taskNameLength}
            isDisabled={taskNameDisabled}
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
            isDisabled={taskTimeDisabled}
            onEditModeChange={() => this.setState({ isTaskTimeEditMode: true })}
            isEditMode={isTaskTimeEditMode}
            onKeyPress={this.handleKeyPress}
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
            isDisabled={breakTimeDisabled}
            onEditModeChange={() => this.setState({ isBreakTimeEditMode: true })}
            isEditMode={isBreakTimeEditMode}
            onKeyPress={this.handleKeyPress}
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
            {/* MINIMIZE BUTTON */}
            <button
              className={maximizeButtonClass}
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
            {/* REMOVE */}
            <button
              className={removeButtonClass}
              onClick={this.handleAlertVisibility}
              disabled={editModeActive || cardRotatingMode}
            >
              <svg className="Task__svg" viewBox="0 0 512 512">
                <use href={`${icons}#remove`}/>
              </svg>
            </button>
          </div>

          {/* START BUTTON */}
          <button
            className={startButtonClass}
            disabled={editModeActive || cardRotatingMode}
            onClick={this.handleStartButton}
          >
            <svg className="Task__svg" viewBox="0 0 512 512">
              <use href={`${icons}#play`} />
            </svg>
          </button>
          
          {/* TIMER COMPONENT */}
          {
            this.state.isTimerMounted
            ? <Timer
                onTaskStateChange={this.handleStateChange}
                state={this.state}
                id={id}
                onTaskRemove={this.handleTaskRemove}
                cardRotatingMode={cardRotatingMode}
              />
            : <div className="empty"></div>
          }

          {/* REMOVE TASK ALERT */}
          <StopAlert
            alertText="Do you really want to remove this task?"
            isStopAlertVisible={isStopAlertVisible}
            onStopCancel={this.handleAlertVisibility}
            onStopConfirm={(id) => this.handleTaskRemove(id)}
          />
        </div>
      </section>
    );
  }
}
export default Task;