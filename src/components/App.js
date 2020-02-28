import React, {Component} from 'react';
import classNames from 'classnames';
import Creator from './Creator';
import Card from './Card';
import Intro from './Intro';
import '../scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.replacedCard = React.createRef();
    this.state = {
      // visibility
      isIntroVisible: false,
      isBoardVisible: false,
      isCreatorVisible: false,
      isDraggingMode: false,
      //cardOffsetX: 0,
      //cardOffsetY: 0,
      //cardOffsetIndex: null,
      tasks: [
        {
          taskName: "Add some feature to TaskTimer App",
          taskMinutes: 20,
          taskSeconds: 0,
          breakMinutes: 5,
          breakSeconds: 0,
          totalTaskTime: 2000000,
          totalBreakTime: 500000,
          totalTaskTimeArray: ["20","00","00"],
          totalBreakTimeArray: ["05","00","00"],
          id: 56436543654,
          dateCreated: 56436543654
        },
        {
          taskName: "Do exercices",
          taskMinutes: 0,
          taskSeconds: 1,
          breakMinutes: 0,
          breakSeconds: 1,
          totalTaskTime: 1000,
          totalBreakTime: 1000,
          totalTaskTimeArray: ["00","01","00"],
          totalBreakTimeArray: ["00","01","00"],
          id: 6546567854,
          dateCreated: 6546567854
        },
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
          id: 90798758576,
          dateCreated: 90798758576
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
          id: 654765387657985,
          dateCreated: 654765387657985
        }
      ],
      // cards
      cardsSizes: [],
      draggedCardIndex: -1,
      hoveredCardIndex: -1,
      hoveredOffsetX: 0,
      hoveredOffsetY: 0,
      noTransitionMode: false,
      // validity
      isTaskNameValid: false,
      isTimeInputValid: false
    };
  }

  componentDidMount = () => {
    this.setState({isBoardVisible: true});
  }

  handleStateChange = (object) => this.setState(object);

  handleTaskOrder = (dragIndex, dropIndex) => {
    const { tasks } = this.state;
    this.setState(prevState => {
      const newTasks = [...prevState.tasks];
      newTasks.splice(dragIndex, 1, tasks[dropIndex]);
      newTasks.splice(dropIndex, 1, tasks[dragIndex]);
      return { tasks: newTasks };
    });
  };
  
  /* handleDropTransition = (cardOffsetIndex, cardOffsetX, cardOffsetY) => {
    this.setState({
      cardOffsetIndex,
      cardOffsetX: cardOffsetX * -1,
      cardOffsetY: cardOffsetY * -1
    });
  }; */
  
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
      tasks,
      isDraggingMode,
      hoveredCardIndex,
      draggedCardIndex,
      hoveredOffsetX,
      hoveredOffsetY,
      cardsSizes
    } = this.state;

    const boardClass = classNames("App__board", {
      "App__board--visible": isBoardVisible
    });

    const newTaskButtonClass = classNames("App__newTaskButton", {
      "App__newTaskButton--visible": !isCreatorVisible
    });

    const creatorContainerClass = classNames("App__creator", {
      "App__creator--maximized": isCreatorVisible
    });

    return (
      <React.StrictMode>
        <div className="App">
          <h1 className="App__heading visuallyhidden">Task Timer App</h1>

          { /* LOGO ANIMATION */
            isIntroVisible
            ?
            <Intro
              isIntroVisible={isIntroVisible}
              onAppStateChange={this.handleStateChange}
            />
            : <div className="empty"></div>
          }

          {/* BOARD OF TASKS */}
          <section className={boardClass}>
            {/* TASK CARDS */}
            {tasks.map((task, index) => (
              <Card
                id={`dnd-${task.dateCreated}`}
                key={`dnd-${task.dateCreated}`}
                task={task}
                cardIndex={index}
                onTaskOrderChange={this.handleTaskOrder}
                onAppStateChange={this.handleStateChange}
                onTaskRemove={this.handleTaskRemove}
                isDraggingMode={isDraggingMode}
                hoveredCardIndex={hoveredCardIndex}
                draggedCardIndex={draggedCardIndex}
                hoveredOffsetX={hoveredOffsetX}
                hoveredOffsetY={hoveredOffsetY}
                cardsSizes={cardsSizes}
              />
            ))}

            {/* CREATE NEW TASK */}
            <section className={creatorContainerClass}>
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