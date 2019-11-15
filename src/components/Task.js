import React, { Component } from 'react';
import EditableText from './EditableText.js';
import TotalTime from './TotalTime.js';
import Timer from './Timer.js';
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
      isTimerVisible: false,
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
      isBreakTimeValid: true,
      startTime: 0
    }
  }
  
  handleStateChange = (object) => this.setState(object);

  handleTaskNameChange = (value) => {
    const { validateTaskName } = this.props;
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
    const { onTimeChange } = this.props;
    const object = onTimeChange(minutes, seconds, units, type);

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
      isTimerVisible: true,
      startTime: Date.now()
    })
  }

  render() {

    const { id, onTimeArrayChange } = this.props;
    const {
      isTimerVisible,
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
    
    return (
      <section
        className={`Task
        ${ isTaskNameEditMode || isTaskTimeEditMode || isBreakTimeEditMode
        ? "Task--editMode" : ""}`}
      >
        {/* TASK  NAME */}
        <EditableText
          className="taskName"
          output={taskName}
          isValid={isTaskNameValid}
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
            className={`button Task__button Task__button--accept
            ${isTaskNameEditMode || isTaskTimeEditMode || isBreakTimeEditMode
            ? "Task__button--visible" : ""}`}
            onClick={this.acceptEditChange}
          >
            <svg className="Task__svg" viewBox="0 0 512 512">
              <use href={`${icons}#tick`}/>
            </svg>
          </button>
          
          {/* REMOVE */}
          <button
            className="button Task__button Task__button--remove"
            onClick={() => this.handleTaskRemove(id)}
          >
            <svg className="Task__svg" viewBox="0 0 512 512">
              <use href={`${icons}#remove`}/>
            </svg>
          </button>
        </div>

        {/* START BUTTON */}
        <button
          className={`button Task__button Task__button--start
          ${ isTaskNameEditMode || isTaskTimeEditMode || isBreakTimeEditMode
          ? "Task__button--disabled" : ""}`}
          disabled={isTaskNameEditMode || isTaskTimeEditMode || isBreakTimeEditMode}
          onClick={this.handleStartButton}
        >
          <svg className="Task__svg" viewBox="0 0 512 512">
            <use href={`${icons}#play`} />
          </svg>
        </button>
        
        {/* TIMER COMPONENT */}
        {
          this.state.isTimerVisible
          ? <Timer
              isTimerVisible={isTimerVisible}
              onTaskStateChange={this.handleStateChange}
              state={this.state}
              id={id}
              onTaskRemove={this.handleTaskRemove}
              onTimeArrayChange={onTimeArrayChange}
            />
          : <div className="empty"></div>
        }
      </section>
    );
  }
}
export default Task;