import React, { Component } from 'react';
import classNames from 'classnames';
import UserForm from './UserForm';
import '../scss/UserPanel.scss';

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserPanelLoaded: false,
      isLoginFormVisible: false,
      isSignupFormVisible: false
    };
  }

  componentDidMount() {
    this.setState({
      isUserPanelLoaded: true,
      isLoginFormVisible: true
    });
  }

  /* handleInputChange = ({target}, type) => {
    this.setState({ [`${type}Login`] : target.value });
  } */

  handleCardToggle = () => {
    this.setState(prevState => ({
      isLoginFormVisible: !prevState.isLoginFormVisible,
      isSignupFormVisible: !prevState.isSignupFormVisible,
      isFirstLoad: false
    }));
  }

  render() {
    const { onUsersChange } = this.props;
    const {
      isUserPanelLoaded,
      isLoginFormVisible,
      isSignupFormVisible } = this.state;

    const userPanelClass = classNames('UserPanel', {
      'UserPanel--visible': isUserPanelLoaded
    });

    const loginClass = classNames('loginForm', {
      'loginForm--rotateIn': isLoginFormVisible,
      'loginForm--rotateOut': !isLoginFormVisible
    });
    const signupClass = classNames('signupForm', {
      'signupForm--rotateIn': isSignupFormVisible,
      'signupForm--rotateOut': !isSignupFormVisible
    });

    return (
      <div className={userPanelClass}>
        <p className="UserPanel__logo">
          task<span className="UserPanel__logo--color">Timer</span>
        </p>
        <div className="UserPanel__container">
          <UserForm
            className={loginClass}
            id="loginForm"
            onCardToggle={this.handleCardToggle}
            onUsersChange={onUsersChange}
          />

          <UserForm
            className={signupClass}
            id="signupForm"
            onCardToggle={this.handleCardToggle}
            onUsersChange={onUsersChange}
          />
        </div>
      </div>
    );
  }
}
export default UserPanel;