import React, { Component } from 'react';
import '../scss/Task.scss';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalTaskTime: 0,
      totalBreakTime: 0
    }
  }

  handleTotalTime = (time) => {
    const { handleTotalTime } = this.props;
    return handleTotalTime(time);
  }

  render() {

    const {
      taskName,
      plannedTaskTime,
      plannedBreakTime,
      dateCreated } = this.props.task;
      
    return (
      <section className="Task">
        <h2 className="Task__name">
          {taskName}
        </h2>
        <p className="Task__totalTaskTime">
          {this.handleTotalTime(plannedTaskTime)}
        </p>
        <p className="Task__totalBreakTime">
          {this.handleTotalTime(plannedBreakTime)}
        </p>
        <p>
          {dateCreated}
        </p>
      </section>
    );
  }
}
export default Task;