import React, {Component} from 'react';
import classNames from 'classnames';
import Task from './Task.js';
import Creator from './Creator.js';
import '../scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility
      isBoardVisible: true,
      isCreatorVisible: false,
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
  
  handleNewTaskButton = () => {
    this.setState({ isCreatorVisible: true });
  }

  render() {

    const { isCreatorVisible, tasks } = this.state;

    const newTaskButtonClass = classNames("App__newTaskButton", {
      "App__newTaskButton--visible": !isCreatorVisible
    });

    return (
      <React.StrictMode>
        <div className="App">
          <h1 className="App__heading visuallyhidden">Task Timer App</h1>
          {/* BOARD OF TASKS */}
          <section className="App__board">
            {/* TASK CARDS */}
            {tasks.map((task) => (
              <Task
                task={task}
                id={task.dateCreated}
                key={task.dateCreated}
                onTaskRemove={this.handleTaskRemove}
              />
            ))}
            {/* CREATE NEW TASK */}
            <section className="App__creator">
              <button
                className={newTaskButtonClass}
                onClick={this.handleNewTaskButton}
              >
                Add New Task
              </button>
              {
                isCreatorVisible
                ? <Creator
                    isVisible={isCreatorVisible}
                    onAppStateChange={this.handleStateChange}
                  />
                : <div className="empty"></div>
              }
            </section>
          </section>
        </div>
      </React.StrictMode>
    );
  }
}
export default App;