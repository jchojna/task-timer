import React, { Component } from 'react';
import NewTaskInput from './NewTaskInput';
import {
  validateTaskName,
  validateTaskTime,
  validateBreakTime,
  handleTimeChange
} from '../lib/handlers';
//import classNames from 'classnames';
//import icons from '../assets/svg/icons.svg';
import '../scss/Creator.scss';

class Creator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility
      isTaskNameVisible: false,
      isTaskTimeVisible: false,
      isBreakTimeVisible: false,
      // inputs
      creatorTaskName: "",
      creatorTaskMinutes: "",
      creatorTaskSeconds: "",
      creatorBreakMinutes: "",
      creatorBreakSeconds: "",
      creatorTotalTaskTime: 0,
      creatorTotalBreakTime: 0,
      creatorTaskTimeArray: ["",""],
      creatorBreakTimeArray: ["",""],
      // validation
      isTaskNameValid: false,
      isTaskTimeValid: false,
      isBreakTimeValid: true
    };
  }

  handleStateChange = (object) => this.setState(object);

  handleTaskName = (value) => {
    this.setState({
      creatorTaskName: value,
      isTaskNameValid: validateTaskName(value),
      alertFlag: true
    });
  }
 
  handleCancelButton = (e) => {
    e.preventDefault();
    const { onStateChange } = this.props;
    // return to Board component
    onStateChange({ isCreatorVisible: false });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { onStateChange } = this.props;
    const {
      creatorTaskName,
      creatorTaskMinutes,
      creatorTaskSeconds,
      creatorBreakMinutes,
      creatorBreakSeconds,
      creatorTotalTaskTime,
      creatorTotalBreakTime,
      creatorTaskTimeArray,
      creatorBreakTimeArray,
      isTaskNameValid,
      isTaskTimeValid
    } = this.state;

    this.setState({
      alertFlag: true
    })    
    // validation
    if (isTaskNameValid && isTaskTimeValid) {
      const date = Date.now();
      // new task data
      const newTask = {
        taskName: creatorTaskName,
        taskMinutes: creatorTaskMinutes,
        taskSeconds: creatorTaskSeconds,
        breakMinutes: creatorBreakMinutes,
        breakSeconds: creatorBreakSeconds,
        totalTaskTime: creatorTotalTaskTime,
        totalBreakTime: creatorTotalBreakTime,
        totalTaskTimeArray: creatorTaskTimeArray,
        totalBreakTimeArray: creatorBreakTimeArray,
        dateCreated: date,
        id: date
      };
      // add new task to app state
      onStateChange(prevState => ({
        isCreatorVisible: false,
        tasks: [...prevState.tasks, newTask]
      }));
      // clear inputs after submitting
      this.setState({
        creatorTaskName: "",
        creatorTaskMinutes: "",
        creatorTaskSeconds: "",
        creatorBreakMinutes: "",
        creatorBreakSeconds: "",
        creatorTotalTaskTime: 0,
        creatorTotalBreakTime: 0,
        isTaskNameValid: false,
        isTimeInputValid: false,
        alertFlag: false
      })
    }
  }

  handleNewTaskButton = (e) => {
    e.preventDefault();
    this.setState({ isTaskNameVisible: true });
  }

  /* handleKeyPress = (e) => {
    const { onStateChange } = this.props;
    const keyPressed = e.key || null;

    if (keyPressed === "Escape" || keyPressed === null) {
      onStateChange({
        isTaskVisible: true,
        isTimeVisible: false,
        isTaskNameChangeActive: true
      })
    }
  } */

  handleTimeChange = (minutes, seconds, units, type) => {
    const newTime = handleTimeChange(minutes, seconds, units, type);

    if (type === 'task') {
      if (units === 'minutes') {
        const { taskMinutes, totalTaskTime, totalTaskTimeArray, isTaskTimeValid } = newTime;
        this.setState({
          creatorTaskMinutes: taskMinutes,
          creatorTotalTaskTime: totalTaskTime,
          creatorTaskTimeArray: totalTaskTimeArray,
          isTaskTimeValid,
          alertFlag: true
        });
      } else if (units === 'seconds') {
        const { taskSeconds, totalTaskTime, totalTaskTimeArray, isTaskTimeValid } = newTime;
        this.setState({
          creatorTaskSeconds: taskSeconds,
          creatorTotalTaskTime: totalTaskTime,
          creatorTaskTimeArray: totalTaskTimeArray,
          isTaskTimeValid,
          alertFlag: true
        });
      }
    } else if (type === 'break') {
      if (units === 'minutes') {
        const { breakMinutes, totalBreakTime, totalBreakTimeArray, isBreakTimeValid } = newTime;
        this.setState({
          creatorBreakMinutes: breakMinutes,
          creatorTotalBreakTime: totalBreakTime,
          creatorBreakTimeArray: totalBreakTimeArray,
          isBreakTimeValid,
          alertFlag: true
        });
      } else if (units === 'seconds') {
        const { breakSeconds, totalBreakTime, totalBreakTimeArray, isBreakTimeValid } = newTime;
        this.setState({
          creatorBreakSeconds: breakSeconds,
          creatorTotalBreakTime: totalBreakTime,
          creatorBreakTimeArray: totalBreakTimeArray,
          isBreakTimeValid,
          alertFlag: true
        });
      }
    }
  }

  handleBackButton = (input) => {

    switch (input) {

      case 'taskName':
        this.setState({
          isTaskNameVisible: false
        });
      break;

      case 'taskTime':
        this.setState({
          isTaskNameVisible: true,
          isTaskTimeVisible: false
        });

      break;

      case 'breakTime':
        this.setState({
          isTaskTimeVisible: true,
          isBreakTimeVisible: false
        });

      break;

      default: return;
    }
  }
  
  handleNextButton = (input) => {
    const { isTaskNameValid, isTaskTimeValid, isBreakTimeValid } = this.state;

    switch (input) {


      case 'taskName':
        if (isTaskNameValid) {
          this.setState({
            isTaskNameVisible: false,
            isTaskTimeVisible: true,
            alertFlag: false
          });
        } else {
          this.setState({
            alertFlag: true
          });
        }
        break;

      case 'taskTime':
        if (isTaskTimeValid) {
          this.setState({
            isTaskTimeVisible: false,
            isBreakTimeVisible: true,
            alertFlag: false
          });
        } else {
          this.setState({
            alertFlag: true
          });
        }
        break;

      case 'breakTime':
        if (isBreakTimeValid) {
          this.setState({
            isBreakTimeVisible: false,
            alertFlag: false
          });
        } else {
          this.setState({
            alertFlag: true
          });
        }
        break;

      default: return;
    }
  }

  render() {

    const {
      // visibility
      isTaskNameVisible,
      isTaskTimeVisible,
      isBreakTimeVisible,
      // inputs
      creatorTaskName,
      creatorTaskMinutes,
      creatorTaskSeconds,
      creatorBreakMinutes,
      creatorBreakSeconds,
      // validation
      isTaskNameValid,
      isTaskTimeValid,
      isBreakTimeValid
    } = this.state;

    return (
      <form
        className="Creator"
        //onSubmit={this.handleFormSubmit}
        //onKeyDown={(e) => this.handleKeyboard(e)}
      >
        {/* ADD NEW TASK BUTTON */}
        <button
          className="Creator__newTaskButton"
          onClick={this.handleNewTaskButton}
        >
          Add New Task
        </button>

        {/* TASK NAME INPUT */}
        <NewTaskInput
          isVisible={isTaskNameVisible}
          isValid={isTaskNameValid}
          modifier="taskName"
          title={creatorTaskName}
          label="Enter task name"
          placeholder="What would be your next task?"
          onBackButtonClick={this.handleBackButton}
          onNextButtonClick={this.handleNextButton}
          onTaskNameChange={this.handleTaskName}
          onCreatorStateChange={this.handleStateChange}
        />

        {/* TASK TIME INPUT */}
        <NewTaskInput
          isVisible={isTaskTimeVisible}
          isValid={isTaskTimeValid}
          modifier="taskTime"
          label="Enter task time"
          placeholder="Enter time here..."
          minutes={creatorTaskMinutes}
          seconds={creatorTaskSeconds}
          onBackButtonClick={this.handleBackButton}
          onNextButtonClick={this.handleNextButton}
          onCreatorStateChange={this.handleStateChange}
          onMinutesChange={(value) =>
            this.handleTimeChange(value, creatorTaskSeconds, 'minutes', 'task')}
          onSecondsChange={(value) =>
            this.handleTimeChange(creatorTaskMinutes, value, 'seconds', 'task')}
        />
        
        {/* BREAK TIME INPUT */}
        <NewTaskInput
          isVisible={isBreakTimeVisible}
          isValid={isBreakTimeValid}
          modifier="breakTime"
          label="Enter max break time"
          placeholder="Enter time here..."
          minutes={creatorBreakMinutes}
          seconds={creatorBreakSeconds}
          onBackButtonClick={this.handleBackButton}
          onNextButtonClick={this.handleNextButton}
          onCreatorStateChange={this.handleStateChange}
          onMinutesChange={(value) =>
            this.handleTimeChange(value, creatorBreakSeconds, 'minutes', 'break')}
          onSecondsChange={(value) =>
            this.handleTimeChange(creatorBreakMinutes, value, 'seconds', 'break')}
        />
      </form>
    );
  }
}
export default Creator;