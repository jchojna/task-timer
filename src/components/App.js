import React, {Component} from 'react';
import classNames from 'classnames';
import Board from './Board';
import Intro from './Intro';
import '../scss/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.replacedCard = React.createRef();
    this.state = {
      // visibility
      isIntroVisible: false,
      isLoginVisible: true,
      isBoardVisible: false,
      users: {
        user1: {




        },
        user2: {




        }
      }
    };
  }

  componentDidMount = () => {
  }

  componentWillUnmount = () => {
  }

  handleStateChange = (object) => this.setState(object);

  render() {
    const { isIntroVisible, isBoardVisible } = this.state;

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