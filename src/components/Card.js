import React, { Component } from 'react';
import classNames from 'classnames';
import EditableText from './EditableText.js';
import TotalTime from './TotalTime.js';
import CardButtons from './CardButtons';
import StopAlert from './StopAlert.js';
import Timer from './Timer.js';
import { validateTaskName, handleTimeChange } from '../lib/handlers';
import { cardFlipTime, animationStyle } from '../lib/globalVariables';
import icons from '../assets/svg/icons.svg';
import '../scss/Card.scss';

class Card extends Component {
  constructor(props) {
    super(props);
    this.card = React.createRef();
    this.transitionTime = 1000;
    const {
      taskName,
      totalTaskTime,
      totalBreakTime,
      totalTaskTimeArray,
      totalBreakTimeArray
    } = this.props.task;

    const [taskMinutes, taskSeconds] = totalTaskTimeArray;
    const [breakMinutes, breakSeconds] = totalBreakTimeArray;
    
    this.state = {
      isDragging: false,
      isMaximized: true,
      isTaskRotatingIn: true,
      isTaskRotatingOut: false,
      isTaskMounted: false,
      isTimerMounted: false,
      isStopAlertVisible: false,
      originalX: 0,
      originalY: 0,
      translateX: 0,
      translateY: 0,
      taskName,
      taskNameLength: taskName.length,
      taskMinutes,
      taskSeconds,
      breakMinutes,
      breakSeconds,
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
    };
  }
  
  componentDidMount = () => {
    this.setState({
      isTaskMounted: true
    });
    this.timeoutId = setTimeout(() => this.setState({
      isTaskRotatingIn: false
    }), cardFlipTime);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    clearTimeout(this.timeoutId);
  }

  handleStateChange = (object) => this.setState(object);

  getHoveredCardSizes = (index) => {
    const {cardIndex, cardsSizes } = this.props;
    return index >= 0
    ? index !== cardIndex
      ? cardsSizes[index]
      : null
    : null; 
  }
  
  handleCardsSizes = () => {
    const { onBoardStateChange } = this.props;
    const appNodes = this.card.current.parentNode.children;

    const cardsSizes = [...appNodes]
    .filter(node => node.classList.contains('Card'))
    .map(card => {
      const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = card;
      return {
        height: offsetHeight,
          width: offsetWidth,
          left: offsetLeft,
          top: offsetTop
        }
      }
    );
    onBoardStateChange({ cardsSizes });
  }

  handleCardDrag = (e) => {
    const { isMaximized } = this.state;
    if (!isMaximized) {
      this.handleMouseDown(e);
    }
  }

  //#region [ Horizon ] MOUSE EVENTS

  handleMouseDown = ({ clientX, clientY }) => {
    const { onBoardStateChange } = this.props;

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
      
    this.setState({
      originalX: clientX + window.scrollX,
      originalY: clientY + window.scrollY
    });
    this.handleCardsSizes();

    onBoardStateChange({
      isPlaceholderVisible: true
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    
    const { onBoardStateChange, cardIndex, cardsSizes } = this.props;
    const xPosition = clientX + window.scrollX;
    const yPosition = clientY + window.scrollY;
    const draggedCardSizes = cardsSizes[cardIndex];

    // find index of hovered card
    const hoveredCardIndex = [...cardsSizes].findIndex(card => {
      const { left, top, width, height } = card;
      const isInsideHorizontally = xPosition >= left && xPosition <= left + width;
      const isInsideVertically = yPosition >= top && yPosition <= top + height;
      //return isInsideHorizontally && isInsideVertically;
      return isInsideHorizontally && isInsideVertically;
    });
    const hoveredCardSizes = this.getHoveredCardSizes(hoveredCardIndex);

    // set translated position of dragged card
    this.setState(prevState => ({
      translateX: xPosition - prevState.originalX,
      translateY: yPosition - prevState.originalY,
      isDragging: true,
    }));

    // set translation offsets of hovered card
    if (hoveredCardSizes) {;
      const offsetX = draggedCardSizes.left - hoveredCardSizes.left;
      const offsetY = draggedCardSizes.top - hoveredCardSizes.top;
  
      onBoardStateChange({
        hoveredOffsetX: offsetX,
        hoveredOffsetY: offsetY
      });
    }

    onBoardStateChange({
      isDraggingMode: true,
      draggedCardIndex: cardIndex,
      hoveredCardIndex: cardIndex !== hoveredCardIndex ? hoveredCardIndex : -1
    });
  };
  
  handleMouseUp = () => {

    const {
      onBoardStateChange,
      draggedCardIndex,
      hoveredCardIndex,
      cardsSizes } = this.props;
    const delay = 30;    
    const draggedCardSizes = cardsSizes[draggedCardIndex];
    const hoveredCardSizes = this.getHoveredCardSizes(hoveredCardIndex);
      
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    // if there is no other card hovered
    if (hoveredCardIndex < 0) {
      this.setState({
        originalX: 0,
        originalY: 0,
        translateX: 0,
        translateY: 0,
        isDragging: false
      });

    } else {

      const { onTaskOrderChange } = this.props;
      
      if (hoveredCardSizes) {
        const offsetX = hoveredCardSizes.left - draggedCardSizes.left;
        const offsetY = hoveredCardSizes.top - draggedCardSizes.top;

        const draggedOffsetX =  -1 * (offsetX - this.state.translateX);
        const draggedOffsetY = -1 * (offsetY - this.state.translateY);

        this.setState({
          originalX: 0,
          originalY: 0,
          translateX: draggedOffsetX,
          translateY: draggedOffsetY
        });
      }

      const timeoutId = setTimeout(() => {
        this.setState({
          translateX: 0,
          translateY: 0,
          isDragging: false
        });
        this.handleCardsSizes();
        clearTimeout(timeoutId);
      }, delay);
      
      onTaskOrderChange(draggedCardIndex, hoveredCardIndex);
    }

    onBoardStateChange({
      isDraggingMode: false
    });

    const timeoutId = setTimeout(() => {
      onBoardStateChange({
        draggedCardIndex: -1,
        hoveredCardIndex: -1
      });
      clearTimeout(timeoutId);
    }, delay);
  };

  //#endregion
  
  handleKeyPress = (key) => {
    const {
      isTaskNameEditMode,
      isTaskTimeEditMode,
      isBreakTimeEditMode
    } = this.state;
    const editModeActive = isTaskNameEditMode || isTaskTimeEditMode || isBreakTimeEditMode;
    
    if (key === "Enter" && editModeActive) this.acceptEditChange();
  }
  
  handleMaximizeCard = () => {
    const { onBoardStateChange } = this.props;
    const { isMaximized } = this.state;
    if (!isMaximized) {
      this.setState({ isMaximized: true });
      onBoardStateChange({ isPlaceholderVisible: false });
    }
  }

  handleTaskNameChange = (value) => {
    this.setState({
      taskName: value,
      taskNameLength: value.length,
      isTaskNameValid: validateTaskName(value)
    });
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
  
  handleEditMode = (input) => {
    const { isMaximized } = this.state;
    if (isMaximized) {
      this.setState({ [`is${input}EditMode`]: true });
    }
  }
  
  acceptEditChange = () => {
    const {
      taskName,
      totalTaskTime,
      totalBreakTime,
      totalTaskTimeArray,
      totalBreakTimeArray,
      isTaskNameValid,
      isTaskTimeValid,
      isBreakTimeValid
    } = this.state;

    const { id } = this.props.task;
    const { onTaskEdit } = this.props;
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
      const editedTask = {
        taskName,
        taskMinutes,
        taskSeconds,
        breakMinutes,
        breakSeconds,
        totalTaskTime,
        totalBreakTime,
        totalTaskTimeArray,
        totalBreakTimeArray,
        id
      }
      onTaskEdit(editedTask, 'edit');
    }
  }
  
  handleAlertVisibility = () => {
    this.setState(prevState => ({
      isStopAlertVisible: !prevState.isStopAlertVisible
    }));
  }
  
  handleTaskRemove = () => {
    const { id } = this.props.task;
    const { onTaskRemove } = this.props;
    onTaskRemove(id);
  }
  
  handleStartButton = () => {
    this.setState({
      isTaskRotatingOut: true,
      isTimerMounted: true
    });
  }

  render() {

    const {
      task: { id },
      cardIndex,
      isDraggingMode,
      draggedCardIndex,
      hoveredCardIndex,
      hoveredOffsetX,
      hoveredOffsetY,
      onBoardStateChange,
      onTaskFinish
    } = this.props;
    
    
    const {
      isDragging,
      translateX,
      translateY,
      isMaximized,
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

    const editModeActive = isTaskNameEditMode
    || isTaskTimeEditMode
    || isBreakTimeEditMode;
    const inputInvalid = !isTaskNameValid
    || !isTaskTimeValid
    || !isBreakTimeValid;
    const cardRotatingMode = isTaskRotatingIn || isTaskRotatingOut;
    const taskNameDisabled = isTaskTimeEditMode
    || isBreakTimeEditMode
    || cardRotatingMode;
    const taskTimeDisabled = isTaskNameEditMode
    || isBreakTimeEditMode
    || cardRotatingMode;
    const breakTimeDisabled = isTaskNameEditMode
    || isTaskTimeEditMode
    || cardRotatingMode;

    const cardStyle = cardIndex === hoveredCardIndex && isDraggingMode
      ? { transform: `translate(${hoveredOffsetX}px, ${hoveredOffsetY}px)` }
      : { transform: `translate(${translateX}px, ${translateY}px)` };
  
    const cardClass = classNames("Card", {
      "Card--dragged": isDragging,
      "Card--hovered": cardIndex === hoveredCardIndex && isDraggingMode,
      "Card--noTransition": isDragging ||
      (cardIndex === draggedCardIndex && hoveredCardIndex !== -1)
    });

    const taskClass = classNames("Task", {
      "Task--visible": isTaskMounted,
      "Task--maximized": isMaximized,
      "Task--editMode": editModeActive,
      "Task--rotateIn": isTaskRotatingIn && isTaskMounted,
      "Task--rotateOut": isTaskRotatingOut && isTaskMounted
    });

    const startButtonClass = classNames("Task__startButton", {
      "Task__startButton--maximized": isMaximized,
      "Task__startButton--disabled": editModeActive || cardRotatingMode
    });

    return (
      <div
        className={cardClass}
        style={cardStyle}
        onMouseDown={this.handleCardDrag}
        ref={this.card}
      >
        <div
          className={taskClass}
          style={animationStyle}
          onClick={this.handleMaximizeCard}
        >
          {/* TASK  NAME */}
          <EditableText
            output={taskName}
            isValid={isTaskNameValid}
            isMaximized={isMaximized}
            taskNameLength={taskNameLength}
            isDisabled={taskNameDisabled}
            isEditMode={isTaskNameEditMode}
            onEditModeChange={() => this.handleEditMode('TaskName')}
            onTaskNameChange={this.handleTaskNameChange}
          />

          {/* TOTAL TASK TIME */}
          <TotalTime
            id={id}
            labelName="Task Time"
            modifier="taskTime"
            isMaximized={isMaximized}
            minutes={taskMinutes}
            seconds={taskSeconds}
            isValid={isTaskTimeValid}
            isDisabled={taskTimeDisabled}
            onEditModeChange={() => this.handleEditMode('TaskTime')}
            isEditMode={isTaskTimeEditMode}
            onKeyPress={this.handleKeyPress}
            onMinutesChange={(value) => 
              this.handleTimeChange(value, taskSeconds, 'minutes', 'task')}
            onSecondsChange={(value) => 
              this.handleTimeChange(taskMinutes, value, 'seconds', 'task')}
          />
          
          {/* TOTAL BREAK TIME */}
          <TotalTime
            id={id}
            labelName="Break Time"
            modifier="breakTime"
            isMaximized={isMaximized}
            minutes={breakMinutes}
            seconds={breakSeconds}
            isValid={isBreakTimeValid}
            isDisabled={breakTimeDisabled}
            onEditModeChange={() => this.handleEditMode('BreakTime')}
            isEditMode={isBreakTimeEditMode}
            onKeyPress={this.handleKeyPress}
            onMinutesChange={(value) => 
              this.handleTimeChange(value, breakSeconds, 'minutes', 'break')}
            onSecondsChange={(value) => 
              this.handleTimeChange(breakMinutes, value, 'seconds', 'break')}
          />

          {/* CARD BUTTONS */}
          <CardButtons
            isMaximized={isMaximized}
            editModeActive={editModeActive}
            inputInvalid={inputInvalid}
            cardRotatingMode={cardRotatingMode}
            onAcceptButtonClick={this.acceptEditChange}
            onRemoveButtonClick={this.handleAlertVisibility}
            onTaskStateChange={this.handleStateChange}
            onBoardStateChange={onBoardStateChange}
            onDrag={this.handleMouseDown}
          />

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
                onCardStateChange={this.handleStateChange}
                onTaskFinish={onTaskFinish}
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
      </div>
    );
  }
}
export default Card;