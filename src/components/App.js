import React, {Component} from 'react';
import Intro from './Intro';
import UserPanel from './UserPanel';
import Board from './Board';
import '../scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visibility
      isIntroVisible: false,
      isUserPanelVisible: true,
      isBoardVisible: false,
      users: {}
    };
  }

  componentDidMount = () => {
  }

  componentWillUnmount = () => {
  }

  handleUsersChange = (user) => {
    const { login } = user;
    this.setState(prevState => ({
      users: {
        ...prevState.users,
        [login]: user
      }
    }));
    console.log(this.state.users);
    /* localStorage.setItem('taskTimerUsers', JSON.stringify(this.state.users)); */
  }

  handleStateChange = (object) => this.setState(object);

  render() {
    const {
      isIntroVisible,
      isUserPanelVisible,
      isBoardVisible } = this.state;

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
            ?
            <UserPanel
              //onAppStateChange={this.handleStateChange}
              onUsersChange={this.handleUsersChange}
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