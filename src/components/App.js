import React, {Component} from 'react';
import Board from './Board.js';
import { 
  validateTaskName,
  handleTimeChange,
  getTimeArray
} from '../lib/handlers';
import '../scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility
      isBoardVisible: true,
      tasks: [
        {
          taskName: "Test task for preview purposes",
          taskMinutes: 30,
          taskSeconds: 0,
          breakMinutes: 10,
          breakSeconds: 0,
          totalTaskTime: 30000,
          totalBreakTime: 10000,
          totalTaskTimeArray: ["00","30","00"],
          totalBreakTimeArray: ["00","10","00"],
          id: 6453654365346,
          dateCreated: 6453654365346
        },
        {
          taskName: "Another task for testing",
          taskMinutes: 0,
          taskSeconds: 1,
          breakMinutes: 0,
          breakSeconds: 1,
          totalTaskTime: 1000,
          totalBreakTime: 1000,
          totalTaskTimeArray: ["00","01","00"],
          totalBreakTimeArray: ["00","01","00"],
          id: 543254234523,
          dateCreated: 543254234523
        },
      ],
      // validity
      isTaskNameValid: false,
      isTimeInputValid: false
    };
  }

  handleStateChange = (object) => this.setState(object);
  
  handleTaskRemove = (id) => this.setState(prevState => ({
    tasks: prevState.tasks.filter(task => task.id !== id)
  }));

  render() {
    return (
      <React.StrictMode>
        <div className="App">
          {/* APP HEADING */}
          <h1 className="App__heading visuallyhidden">Task Timer App</h1>
          {/* BOARD OF TASKS */}
          <Board
            state={this.state}
            onStateChange={this.handleStateChange}
            onTaskRemove={this.handleTaskRemove}
            onTimeChange={handleTimeChange}
            validateTaskName={validateTaskName}
            onTimeArrayChange={getTimeArray}
          />
        </div>
      </React.StrictMode>
    );
  }
}
export default App;