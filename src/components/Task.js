import React, { Component } from 'react';
import '../scss/Task.scss';

class Task extends Component {
  constructor(props) {
    super(props);
    const {totalTaskTime, totalBreakTime} = this.props.task;
    this.state = {
      totalTaskTime,
      totalBreakTime
    }
  }

  render() {

    const {
      taskName, dateCreated } = this.props.task;

    return (
      <section className="Task">
        <h2 className="Task__name">
          {taskName}
        </h2>
        <p className="Task__totalTaskTime">
          {this.state.totalTaskTime}
        </p>
        <p className="Task__totalBreakTime">
          {this.state.totalBreakTime}
        </p>
        <p>
          {dateCreated}
        </p>
      </section>
    );
  }
}
export default Task;