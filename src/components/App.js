import React, {Component} from 'react';
import Intro from './Intro';
import UserPanel from './UserPanel';
import Board from './Board';
import Logo from './Logo';
import { initialUsers } from '../lib/initialUsers';
import '../scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isIntroVisible: false,
      isUserPanelVisible: true,
      isBoardVisible: false,
      users: initialUsers,
      loggedUserLogin: null
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem('taskTimerUsers')) {
      const users = JSON.parse(localStorage.getItem('taskTimerUsers'));
      this.setState({ users });
    } else {
      this.exportUsers();
    }
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

  handleUserUpdate = () => {








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
            isUserPanelVisible
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
              onUserRemove={this.handleUserRemove}
              onTaskRemove={this.handleTaskRemove}
              onTaskOrderChange={this.handleTaskOrder}
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