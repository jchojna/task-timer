import React, { Component } from 'react';
import Task from './Task.js';
import Creator from './Creator.js';
import { handleTimeChange } from '../lib/handlers';
import '../scss/Board.scss';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCreatorVisible: false
    }
  }

  handleCreateNewTaskButton = () => {
    const { onStateChange } = this.props;
    onStateChange({
      isCreatorVisible: true
    });
  }

  render() {
    const {
      state,
      onTaskRemove,
      validateTaskName,
      onTimeChange,
      onTimeArrayChange
    } = this.props;
    const { tasks } = state;
    const { isCreatorVisible } = this.state;

    return (
      <section className="Board">

        {/* TASK CARDS */}
        {tasks.map((task) => (
          <Task
            task={task}
            id={task.dateCreated}
            key={task.dateCreated}
            onTaskRemove={onTaskRemove}
            validateTaskName={validateTaskName}
            onTimeChange={onTimeChange}
            onTimeArrayChange={onTimeArrayChange}
          />
        ))}

        {/* ADD NEW TASK BUTTON */}
        <button
          className="button Board__createButton"
          onClick={this.handleCreateNewTaskButton}
        >
          Add New Task
        </button>

        {/* TASK CREATOR */}
        <Creator
          compClassName={isCreatorVisible
            ? "Creator--visible slideInRight" : "slideOutLeft"}
          onStateChange={this.handleStateChange}
          onTimeChange={handleTimeChange}
          validateTaskName={validateTaskName}
        />
      </section>
    );
  }
}
export default Board;