import React, {Component} from 'react';
import Intro from './Intro';
import UserPanel from './UserPanel';
import Board from './Board';
import Logo from './Logo';
import { initialUsers } from '../lib/initialUsers';
import { makeTwoDigits, getTotalDays, getTimeArray } from '../lib/handlers';
import '../scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppLoaded: false,
      isIntroVisible: false,
      isUserPanelVisible: true,
      isBoardVisible: false,
      users: initialUsers,
      loggedUserLogin: null,
      date: null,
      createdAt: null
    };
  }

  componentDidMount = () => {
    // update app state from local storage
    if (localStorage.getItem('taskTimerUsers')) {
      const users = JSON.parse(localStorage.getItem('taskTimerUsers'));

      this.setState({
        users,
        isAppLoaded: true
      });

    // set state and export to local storage based on initial users object
    } else {

      const { users } = this.state;
      [...users].forEach(user => {
        const {
          finishedTasks,
          totalTaskTime,
          totalBreakTime
        } = user.stats;

        // set date of profile creation
        let [day, month, year, hr, min] = user.date;
        const date = new Date(year, month, day, hr, min);
        // set stat displaying creation date
        day = makeTwoDigits(day);
        month = makeTwoDigits(month + 1);
        hr = makeTwoDigits(hr);
        min = makeTwoDigits(min);
        
        const totalDays = getTotalDays(date);
        const avgTasksPerDay = Math.round(finishedTasks / totalDays);
        const avgTaskTime = getTimeArray(totalTaskTime / finishedTasks);
        const avgBreakTime = getTimeArray(totalBreakTime / finishedTasks);
        const [ taskMin, taskSec ] = avgTaskTime;
        const [ breakMin, breakSec ] = avgBreakTime;
        const formattedAvgTaskTime = `${taskMin} min ${taskSec} sec`;
        const formattedAvgBreakTime = `${breakMin} min ${breakSec} sec`;

        user.stats.avgTasksPerDay = avgTasksPerDay;
        user.stats.avgTaskTime = formattedAvgTaskTime;
        user.stats.avgBreakTime = formattedAvgBreakTime;
        user.createdAt = date;
        user.stats.dateCreated = `${day}-${month}-${year} ${hr}:${min}`;
      });

      this.setState(prevState => ({
        users: prevState.users,
        isAppLoaded: true
      }));

      this.exportUsers();
    }
    this.setState({ isAppLoaded: true });
  }

  componentDidUpdate = () => {
    console.log('APP UPDATED');
    this.exportUsers();
  }

  componentWillUnmount = () => {
  }

  handleStateChange = (object) => this.setState(object);

  exportUsers = () => {
    const { users } = this.state;
    localStorage.setItem('taskTimerUsers', JSON.stringify(users));
  }

  handleUserLogin = (user, form) => {
    this.setState(prevState => ({
      isUserPanelVisible: false,
      isBoardVisible: true,
      users: form === 'loginForm' ? this.state.users : [...prevState.users, user],
      loggedUserLogin: user.login
    }));
  }

  handleUserLogout = () => {
    const { users, loggedUserLogin } = this.state;
    const user = [...users].find(user => user.login === loggedUserLogin);

    user.rememberMe = false;

    this.setState(prevState => ({
      users: prevState.users,
      isUserPanelVisible: true,
      isBoardVisible: false,
      loggedUserLogin: null
    }));
  }

  handleUserRemove = () => {
    const { loggedUserLogin } = this.state;

    this.setState(prevState => ({
      users: [...prevState.users].filter(user => user.login !== loggedUserLogin),
      isBoardVisible: false,
      isUserPanelVisible: true
    }));
  }

  handleTaskRemove = (id) => {
    const { loggedUserLogin, users } = this.state;

    this.setState(prevState => {
      const user = [...prevState.users].find(user => user.login === loggedUserLogin);
      user.tasks = user.tasks.filter(task => task.id !== id);
      return { users };
    })
  }
  
  handleTaskOrder = (dragIndex, dropIndex) => {
    const { loggedUserLogin, users } = this.state;

    this.setState(prevState => {
      const user = [...prevState.users].find(user => user.login === loggedUserLogin);
      const tasks = user.tasks;
      const updatedTasks = [...tasks];
      updatedTasks.splice(dragIndex, 1, tasks[dropIndex]);
      updatedTasks.splice(dropIndex, 1, tasks[dragIndex]);
      user.tasks = updatedTasks;
      return { users };
    });
  }

  handleUserUpdate = (value, prop) => {
    const { loggedUserLogin, users } = this.state;
    const user = [...users].find(user => user.login === loggedUserLogin);

    user[prop] = value;
    if (prop === 'login') this.setState({ loggedUserLogin: value });
  }

  handleTaskFinish = (results) => {

    const { users, loggedUserLogin } = this.state;
    const { elapsedTaskTime, elapsedBreakTime } = results;

    const user = [...users].find(user => user.login === loggedUserLogin);
    const {
      finishedTasks,
      totalTaskTime,
      totalBreakTime
    } = user.stats;
    
    const totalDays = getTotalDays(user.createdAt);
    const updatedFinishedTasks = finishedTasks + 1;
    const updatedTotalTaskTime = totalTaskTime + elapsedTaskTime;
    const updatedTotalBreakTime = totalBreakTime + elapsedBreakTime;
    const avgTasksPerDay = Math.round(updatedFinishedTasks / totalDays);
    const avgTaskTime = getTimeArray(updatedTotalTaskTime / updatedFinishedTasks);
    const avgBreakTime = getTimeArray(updatedTotalBreakTime / updatedFinishedTasks);
    const [ taskMin, taskSec ] = avgTaskTime;
    const [ breakMin, breakSec ] = avgBreakTime;
    const formattedAvgTaskTime = `${taskMin} min ${taskSec} sec`;
    const formattedAvgBreakTime = `${breakMin} min ${breakSec} sec`;

    user.stats.finishedTasks = updatedFinishedTasks;
    user.stats.totalTaskTime = updatedTotalTaskTime;
    user.stats.totalBreakTime = updatedTotalBreakTime;
    user.stats.avgTaskTime = formattedAvgTaskTime;
    user.stats.avgBreakTime = formattedAvgBreakTime;
    user.stats.avgTasksPerDay = avgTasksPerDay;

    this.setState(prevState => ({
      users: prevState.users
    }));
  }

  handleTaskEdit = (newTask, option) => {
    const { users, loggedUserLogin } = this.state;
    const user = [...users].find(user => user.login === loggedUserLogin);

    if (option === 'edit') {

      //const taskId = newTask.id;
      //user.tasks = [...user.tasks.filter(task => task.id !== taskId), newTask];


    } else if (option === 'add') {

      user.tasks = [...user.tasks, newTask];
  
      this.setState(prevState => ({
        users: prevState.users
      }));
    }
  }

  render() {
    const {
      isAppLoaded,
      isIntroVisible,
      isUserPanelVisible,
      isBoardVisible,
      users,
      loggedUserLogin
    } = this.state;

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
          { /* USER PANEL */
            isUserPanelVisible && isAppLoaded
            ? <UserPanel
                onUserLogin={this.handleUserLogin}
                users={users}
              />
            : <div className="empty"></div>
          }
          { /* BOARD */
            isBoardVisible
            ?
            <Board
              users={users}
              loggedUserLogin={loggedUserLogin}
              onUserUpdate={this.handleUserUpdate}
              onUserLogout={this.handleUserLogout}
              onUserRemove={this.handleUserRemove}
              onTaskRemove={this.handleTaskRemove}
              onTaskOrderChange={this.handleTaskOrder}
              onTaskFinish={this.handleTaskFinish}
              onTaskEdit={this.handleTaskEdit}
            />
            : <div className="empty"></div>
          }
          <Logo />
        </div>
      </React.StrictMode>
    );
  }
}
export default App;