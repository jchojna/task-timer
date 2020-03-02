import React, {Component} from 'react';
import Intro from './Intro';
import UserPanel from './UserPanel';
import Board from './Board';
import { initialUsers } from '../lib/initialUsers';
import '../scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isIntroVisible: false,
      isUserPanelVisible: true,
      isBoardVisible: false,
      users: initialUsers
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
    this.exportUsers();
  }

  componentWillUnmount = () => {
  }

  exportUsers = () => {
    const { users } = this.state;
    localStorage.setItem('taskTimerUsers', JSON.stringify(users));
  }

  handleUsersChange = (user) => {
    this.setState(prevState => ({
      users: [ ...prevState.users, user ]
    }));
  }

  handleStateChange = (object) => this.setState(object);

  render() {
    const {
      isIntroVisible,
      isUserPanelVisible,
      isBoardVisible,
      users } = this.state;

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
                //onAppStateChange={this.handleStateChange}
                onUsersChange={this.handleUsersChange}
                users={users}
              />
            : <div className="empty"></div>
          }
          { /* BOARD */
            isBoardVisible
            ?
            <Board />
            : <div className="empty"></div>
          }
        </div>
      </React.StrictMode>
    );
  }
}
export default App;