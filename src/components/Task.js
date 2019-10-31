import React, { Component } from 'react';
import Display from './Display.js';
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

    const { taskName, dateCreated } = this.props.task;
    const { handleTimeArray } = this.props;
    const { totalTaskTime, totalBreakTime } = this.state;

    return (
      <section className="Task">
        <h2 className="Task__name">
          {taskName}
        </h2>
        <Display
          className="Task__totalTaskTime"
          taskTimeArray={handleTimeArray(totalTaskTime)}
        />
        <Display
          className="Task__totalBreakTime"
          taskTimeArray={handleTimeArray(totalBreakTime)}
        />
        <p>
          {dateCreated}
        </p>
      </section>
    );
  }
}
export default Task;