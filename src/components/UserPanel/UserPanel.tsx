import React, { Component } from 'react';
import classNames from 'classnames';
import UserForm from './UserForm';
import styles from './UserPanel.module.scss';

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserPanelLoaded: false,
      isLoginFormVisible: false,
      isSignupFormVisible: false,
    };
  }

  componentDidMount() {
    this.setState({
      isUserPanelLoaded: true,
      isLoginFormVisible: true,
    });
  }

  handleCardToggle = () => {
    this.setState((prevState) => ({
      isLoginFormVisible: !prevState.isLoginFormVisible,
      isSignupFormVisible: !prevState.isSignupFormVisible,
    }));
  };

  render() {
    const { onUserLogin, users } = this.props;
    const { isUserPanelLoaded, isLoginFormVisible, isSignupFormVisible } =
      this.state;

    const userPanelClass = classNames(styles.container, {
      [styles['container--visible']]: isUserPanelLoaded,
    });

    const loginClass = classNames('loginForm', {
      'loginForm--rotateIn': isLoginFormVisible,
      'loginForm--rotateOut': !isLoginFormVisible,
    });

    const signupClass = classNames('signupForm', {
      'signupForm--rotateIn': isSignupFormVisible,
      'signupForm--rotateOut': !isSignupFormVisible,
    });

    return (
      <div className={userPanelClass}>
        <p className={styles.logo}>
          task<span className={styles['logo--color']}>Timer</span>
        </p>
        <div className={styles.wrapper}>
          {/* LOGIN FORM */}
          <UserForm
            formClassNames={loginClass}
            block="loginForm"
            onUserLogin={onUserLogin}
            users={users}
            onCardToggle={this.handleCardToggle}
          />
          {/* SIGNUP FORM */}
          <UserForm
            formClassNames={signupClass}
            block="signupForm"
            onUserLogin={onUserLogin}
            users={users}
            onCardToggle={this.handleCardToggle}
          />
        </div>
      </div>
    );
  }
}
export default UserPanel;
