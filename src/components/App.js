import React, {Component} from 'react';
import Intro from './Intro';
import UserPanel from './UserPanel';
import Board from './Board';
import Logo from './Logo';
import { initialUsers } from '../lib/initialUsers';
import { makeTwoDigits } from '../lib/handlers';
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
      stats: {
        finishedTasks: 0,
        avgTaskTime: 0,
        avgBreakTime: 0,
        avgTasksPerDay: 0,
        dateCreated: ''
      },
      statsLabels: {
        finishedTasks: 'Tasks finished:',
        avgTaskTime: 'Average task time:',
        avgBreakTime: 'Average break time:',
        avgTasksPerDay: 'Average tasks per day:',
        dateCreated: 'Profile created at:'
      }
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem('taskTimerUsers')) {
      const users = JSON.parse(localStorage.getItem('taskTimerUsers'));
      console.log('users', users);

      this.setState(prevState => ({
        users,
        isAppLoaded: true
      }));

    } else {

      const { users } = this.state;
      [...users].forEach(user => {
        let [day, month, year, hr, min] = user.date;
        const date = new Date(year, month, day, hr, min);
        /* const y = date.getFullYear();
        const m = date.getMonth();
        const d = date.getDay();
        const hr = date.getMinutes();
        const min = date.getSeconds();
        user.stats.dateCreated = `${d}-${m}-${y} ${hr}:${min}`; */
        day = makeTwoDigits(day);
        month = makeTwoDigits(month + 1);
        hr = makeTwoDigits(hr);
        min = makeTwoDigits(min);
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
    console.log('app state updated');
    this.exportUsers();
  }

  componentWillUnmount = () => {
  }

  handleStateChange = (object) => this.setState(object);

  exportUsers = () => {
    const { users } = this.state;
    localStorage.setItem('taskTimerUsers', JSON.stringify(users));
  }

  handleUserLogout = () => {
    this.setState({
      isUserPanelVisible: true,
      isBoardVisible: false,
      loggedUserLogin: null
    });
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

  handleUserLogin = (user, form) => {
    this.setState(prevState => ({
      isUserPanelVisible: false,
      isBoardVisible: true,
      users: form === 'loginForm' ? this.state.users : [...prevState.users, user],
      loggedUserLogin: user.login
    }));
  }

  render() {
    const {
      isAppLoaded,
      isIntroVisible,
      isUserPanelVisible,
      isBoardVisible,
      users,
      loggedUserLogin,
      statsLabels
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
              statsLabels={statsLabels}
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