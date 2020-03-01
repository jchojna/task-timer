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
      isSignupFormVisible: false,
      isLoginAlertVisible: false,
      isPasswordAlertVisible: false,
      isConfirmAlertVisible: false
    };
  }

  componentDidMount() {
    this.setState({
      isUserPanelLoaded: true,
      isLoginFormVisible: true
    });
  }

  handleUserPanelState = (object) => this.setState(object);

  handleCardToggle = () => {
    this.setState(prevState => ({
      isLoginFormVisible: !prevState.isLoginFormVisible,
      isSignupFormVisible: !prevState.isSignupFormVisible,
      isLoginAlertVisible: false,
      isPasswordAlertVisible: false,
      isConfirmAlertVisible: false
    }));
  }

  /* handleInputChange = ({target}, type) => {
    this.setState({ [`${type}Login`] : target.value });
  } */

  render() {
    const { onUsersChange } = this.props;
    const {
      isUserPanelLoaded,
      isLoginFormVisible,
      isSignupFormVisible
    } = this.state;

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
          {/* LOGIN FORM */}
          <UserForm
            className={loginClass}
            block="loginForm"
            onCardToggle={this.handleCardToggle}
            onUserPanelStateChange={this.handleUserPanelState}
            onUsersChange={onUsersChange}
            userPanelState={this.state}
          />
          {/* SIGNUP FORM */}
          <UserForm
            className={signupClass}
            block="signupForm"
            onCardToggle={this.handleCardToggle}
            onUserPanelStateChange={this.handleUserPanelState}
            onUsersChange={onUsersChange}
            userPanelState={this.state}
          />
        </div>
      </div>
    );
  }
}
export default UserPanel;