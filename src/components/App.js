import React, {Component} from 'react';
import classNames from 'classnames';
import Task from './Task';
import Creator from './Creator';
import Intro from './Intro';
import '../scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility
      isIntroVisible: true,
      isBoardVisible: false,
      isCreatorVisible: false,
      tasks: [
        {
          taskName: "Test task for preview purposes",
          taskMinutes: 30,
          taskSeconds: 0,
          breakMinutes: 10,
          breakSeconds: 0,
          totalTaskTime: 500000,
          totalBreakTime: 100000,
          totalTaskTimeArray: ["05","00","00"],
          totalBreakTimeArray: ["01","00","00"],
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

  componentDidMount = () => {
    this.setState({isBoardVisible: true});
  }

  handleStateChange = (object) => this.setState(object);
  
  handleTaskRemove = (id) => this.setState(prevState => ({
    tasks: prevState.tasks.filter(task => task.id !== id)
  }));
  
  handleNewTaskButton = () => {
    this.setState({ isCreatorVisible: true });
  }

  render() {

    const {
      isIntroVisible,
      isBoardVisible,
      isCreatorVisible,
      tasks
    } = this.state;

    const boardClass = classNames("App__board", {
      "App__board--visible": isBoardVisible
    });

    const newTaskButtonClass = classNames("App__newTaskButton", {
      "App__newTaskButton--visible": !isCreatorVisible
    });

    return (
      <React.StrictMode>
        <div className="App">
          <h1 className="App__heading visuallyhidden">Task Timer App</h1>

          { /* LOGO ANIMATION */
            /* isIntroVisible
            ?
            <Intro
              isIntroVisible={isIntroVisible}
              onAppStateChange={this.handleStateChange}
            />
            : <div className="empty"></div> */
          }

          {/* BOARD OF TASKS */}
          <section className={boardClass}>
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