import React, { Component } from 'react';
import Intro from './Intro';
import UserPanel from './UserPanel';
import Board from './Board';
import Logo from './Logo';
import initialUsers from 'lib/initialUsers';
import { makeTwoDigits, getTotalDays, getTimeArray } from 'lib/handlers';
import styles from './App.module.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility
      isAppLoaded: false,
      isIntroVisible: true,
      isUserPanelVisible: true,
      isBoardVisible: false,
      // users
      users: null,
      loggedUserId: '',
      createdAt: null,
    };
  }

  componentDidMount = () => {
    // update app state from local storage
    const storedUsers = localStorage.getItem('taskTimerUsers');
    if (storedUsers !== 'null') {
      const taskTimerUsers = JSON.parse(storedUsers);

      this.setState({
        isAppLoaded: true,
        users: taskTimerUsers,
      });

      // set state and export to local storage based on initial users object
    } else {
      //const { users } = this.state;
      let users = {};

      for (let user of initialUsers) {
        const { finishedTasks, totalTaskTime, totalBreakTime } = user.stats;

        // set date of profile creation
        let [day, month, year, hr, min] = user.date;
        const date = new Date(year, month, day, hr, min);
        const userId = date.getTime();
        // set stat displaying creation date
        day = makeTwoDigits(day);
        month = makeTwoDigits(month + 1);
        hr = makeTwoDigits(hr);
        min = makeTwoDigits(min);

        const totalDays = getTotalDays(date);
        const avgTasksPerDay = Math.round(finishedTasks / totalDays);
        const avgTaskTime = getTimeArray(totalTaskTime / finishedTasks);
        const avgBreakTime = getTimeArray(totalBreakTime / finishedTasks);
        const [taskMin, taskSec] = avgTaskTime;
        const [breakMin, breakSec] = avgBreakTime;
        const formattedAvgTaskTime = `${taskMin} min ${taskSec} sec`;
        const formattedAvgBreakTime = `${breakMin} min ${breakSec} sec`;

        user.stats.avgTasksPerDay = avgTasksPerDay;
        user.stats.avgBreakTime = formattedAvgBreakTime;
        user.stats.avgTaskTime = formattedAvgTaskTime;
        user.stats.dateCreated = `${day}-${month}-${year} ${hr}:${min}`;
        user.createdAt = date;

        users = { ...users, [userId]: user };
      }
      this.setState({ isAppLoaded: true, users });
    }
    this.exportUsers();
  };

  componentDidUpdate = () => {
    this.exportUsers();
  };

  handleStateChange = (object) => this.setState(object);

  exportUsers = () => {
    const { users } = this.state;
    localStorage.setItem('taskTimerUsers', JSON.stringify(users));
  };

  handleUserLogin = (user, form) => {
    const { users } = this.state;

    const loggedUserId =
      form === 'loginForm'
        ? Object.entries(users).find(([key, value]) => value === user)[0]
        : new Date(user.createdAt).getTime();

    this.setState((prevState) => ({
      isUserPanelVisible: false,
      isBoardVisible: true,
      users:
        form === 'loginForm'
          ? prevState.users
          : { ...prevState.users, [loggedUserId]: user },
      loggedUserId,
    }));
  };

  handleUserLogout = () => {
    const { users, loggedUserId } = this.state;
    const user = users[loggedUserId];
    user.rememberMe = false;

    this.setState((prevState) => ({
      users: { ...prevState.users },
      loggedUserId: '',
      isUserPanelVisible: true,
      isBoardVisible: false,
    }));
  };

  handleUserRemove = () => {
    const { users, loggedUserId } = this.state;
    delete users[loggedUserId];

    this.setState((prevState) => ({
      users: { ...prevState.users },
      isBoardVisible: false,
      isUserPanelVisible: true,
    }));
  };

  handleTaskRemove = (id) => {
    const { users, loggedUserId } = this.state;
    const user = users[loggedUserId];
    user.tasks = user.tasks.filter((task) => task.id !== id);

    this.setState((prevState) => ({
      users: { ...prevState.users },
    }));
  };

  handleTaskOrder = (dragIndex, dropIndex) => {
    const { users, loggedUserId } = this.state;
    const user = users[loggedUserId];
    const { tasks } = user;
    const updatedTasks = [...tasks];
    updatedTasks.splice(dragIndex, 1, tasks[dropIndex]);
    updatedTasks.splice(dropIndex, 1, tasks[dragIndex]);
    user.tasks = updatedTasks;

    this.setState((prevState) => ({
      users: { ...prevState.users },
    }));
  };

  handleUserUpdate = (value, prop) => {
    const { users, loggedUserId } = this.state;
    const user = users[loggedUserId];
    user[prop] = value;

    this.setState((prevState) => ({
      users: { ...prevState.users },
    }));
  };

  handleTaskFinish = (results) => {
    const { users, loggedUserId } = this.state;
    const { elapsedTaskTime, elapsedBreakTime } = results;
    const user = users[loggedUserId];

    const { finishedTasks, totalTaskTime, totalBreakTime } = user.stats;

    const totalDays = getTotalDays(user.createdAt);
    const updatedFinishedTasks = finishedTasks + 1;
    const updatedTotalTaskTime = totalTaskTime + elapsedTaskTime;
    const updatedTotalBreakTime = totalBreakTime + elapsedBreakTime;
    const avgTasksPerDay = Math.round(updatedFinishedTasks / totalDays);
    const avgTaskTime = getTimeArray(
      updatedTotalTaskTime / updatedFinishedTasks
    );
    const avgBreakTime = getTimeArray(
      updatedTotalBreakTime / updatedFinishedTasks
    );
    const [taskMin, taskSec] = avgTaskTime;
    const [breakMin, breakSec] = avgBreakTime;
    const formattedAvgTaskTime = `${taskMin} min ${taskSec} sec`;
    const formattedAvgBreakTime = `${breakMin} min ${breakSec} sec`;

    user.stats.finishedTasks = updatedFinishedTasks;
    user.stats.totalTaskTime = updatedTotalTaskTime;
    user.stats.totalBreakTime = updatedTotalBreakTime;
    user.stats.avgTaskTime = formattedAvgTaskTime;
    user.stats.avgBreakTime = formattedAvgBreakTime;
    user.stats.avgTasksPerDay = avgTasksPerDay;

    this.setState((prevState) => ({
      users: { ...prevState.users },
    }));
  };

  handleTaskEdit = (newTask, option) => {
    const { users, loggedUserId } = this.state;
    const user = users[loggedUserId];

    if (option === 'edit') {
      const { id } = newTask;
      const tasksIds = user.tasks.map((task) => task.id);
      const editedIndex = tasksIds.indexOf(id);

      user.tasks = [
        ...user.tasks.filter(
          (task, idx) => task.id !== id && idx < editedIndex
        ),
        newTask,
        ...user.tasks.filter(
          (task, idx) => task.id !== id && idx > editedIndex
        ),
      ];
    } else if (option === 'add') {
      user.tasks = [...user.tasks, newTask];
    }

    this.setState((prevState) => ({
      users: { ...prevState.users },
    }));
  };

  render() {
    const {
      isAppLoaded,
      isIntroVisible,
      isUserPanelVisible,
      isBoardVisible,
      users,
      loggedUserId,
    } = this.state;

    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Task Timer App</h1>
        {
          /* LOGO ANIMATION */
          // isIntroVisible ? (
          //   <Intro
          //     isIntroVisible={isIntroVisible}
          //     onAppStateChange={this.handleStateChange}
          //   />
          // ) : (
          //   <div className="empty"></div>
          // )
        }
        {
          /* USER PANEL */
          isUserPanelVisible && isAppLoaded && (
            <UserPanel users={users} onUserLogin={this.handleUserLogin} />
          )
        }
        {
          /* BOARD */
          isBoardVisible ? (
            <Board
              users={users}
              loggedUserId={loggedUserId}
              onUserUpdate={this.handleUserUpdate}
              onUserLogout={this.handleUserLogout}
              onUserRemove={this.handleUserRemove}
              onTaskRemove={this.handleTaskRemove}
              onTaskOrderChange={this.handleTaskOrder}
              onTaskFinish={this.handleTaskFinish}
              onTaskEdit={this.handleTaskEdit}
            />
          ) : (
            <div className="empty"></div>
          )
        }
        <Logo />
      </div>
    );
  }
}
export default App;
