import React, { Component } from 'react';
import classNames from 'classnames';
import UserEdit from './UserEdit';
import icons from 'assets/svg/icons.svg';
import { getCapitalized } from 'lib/handlers.js';
import styles from './Sidebar.module.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      editedSetting: null,
      // login
      login: '',
      isLoginValid: false,
      isLoginAlertVisible: false,
      loginAlertText: 'Please enter your login',
      // password
      oldPassword: '',
      isOldPasswordValid: false,
      isOldPasswordAlertVisible: false,
      oldPasswordAlertText: 'Please enter your old password',
      isOldPasswordPreviewMode: false,
      // new password
      newPassword: '',
      isNewPasswordValid: false,
      isNewPasswordAlertVisible: false,
      newPasswordAlertText: 'Please enter your new password',
      isNewPasswordPreviewMode: false,
      // password confirm
      confirm: '',
      isConfirmValid: false,
      isConfirmAlertVisible: false,
      confirmAlertText: 'Please confirm your password',
      isConfirmPreviewMode: false,
      isConfirmDisabled: true,
    };
  }

  handleStateChange = (object) => this.setState(object);

  handleAlert = (value, input) => {
    const inputName = getCapitalized(input);
    const alertText = this.getInputAlert(value, input);

    this.setState({
      [`is${inputName}AlertVisible`]: true,
      [`${input}AlertText`]: alertText,
    });
  };

  getInputAlert = (value, input) => {
    const { newPassword } = this.state;
    const isEmpty = value === '';
    const doesContainWhiteSpaces = /\s/g.test(value);
    const isPasswordTooShort = value.length < 6;

    switch (input) {
      case 'login':
        const { block, users, loggedUserId } = this.props;
        const { login } = users[loggedUserId];

        const doesLoginExist = Object.values(users)
          .map((user) => user.login)
          .find((userLogin) => userLogin === value && userLogin !== login);

        const isLoginIncorrect = block === 'loginForm' && !doesLoginExist;
        const isNewLoginIncorrect =
          (block === 'signupForm' || block === 'userEdit') && doesLoginExist;

        return isEmpty
          ? 'Please enter your login'
          : isLoginIncorrect
          ? 'There is no user with this login'
          : isNewLoginIncorrect
          ? 'This login already exist. Try another one'
          : false;

      case 'password':
      case 'oldPassword':
      case 'newPassword':
        return isEmpty
          ? 'Please enter your password'
          : doesContainWhiteSpaces
          ? 'Password cannot contain any spaces'
          : isPasswordTooShort
          ? 'Password should have at least 6 characters'
          : false;

      case 'confirm':
        const doPasswordsMatch = newPassword === value;

        return isEmpty
          ? 'Please confirm your password'
          : !doPasswordsMatch
          ? 'Passwords do not match!'
          : false;

      default:
        return false;
    }
  };

  handleLoginValidation = (value) => {
    const isInvalid = this.getInputAlert(value, 'login') ? true : false;

    this.setState({
      login: value,
      isLoginValid: !isInvalid,
      isLoginAlertVisible: false,
    });
  };

  handleOldPasswordValidation = (value) => {
    const isInvalid = this.getInputAlert(value, 'password') ? true : false;

    this.setState({
      oldPassword: value,
      isOldPasswordValid: !isInvalid,
      isOldPasswordAlertVisible: false,
      isOldPasswordPreviewed: false,
    });
  };

  handleNewPasswordValidation = (value) => {
    const isInvalid = this.getInputAlert(value, 'password') ? true : false;

    this.setState({
      newPassword: value,
      isNewPasswordValid: !isInvalid,
      isNewPasswordAlertVisible: false,
      isNewPasswordPreviewed: false,

      confirm: '',
      isConfirmValid: false,
      isConfirmAlertVisible: false,
      isConfirmPreviewMode: false,
      isConfirmDisabled: isInvalid,
    });
  };

  handleConfirmValidation = (value) => {
    const isInvalid = this.getInputAlert(value, 'confirm') ? true : false;

    this.setState({
      confirm: value,
      isConfirmValid: !isInvalid,
      isConfirmAlertVisible: false,
      isConfirmPreviewed: false,
    });
  };

  handlePasswordPreview = (input) => {
    const inputName = getCapitalized(input);

    this.setState((prevState) => ({
      [`is${inputName}PreviewMode`]: !prevState[`is${inputName}PreviewMode`],
    }));
  };

  handleUserEdit = (setting) => {
    const { onUserUpdate, onUserLogout, onUserRemove, users, loggedUserId } =
      this.props;

    const { editedSetting, login, oldPassword, newPassword } = this.state;
    const user = users[loggedUserId];

    if (setting === 'confirm') {
      switch (editedSetting) {
        case 'login':
          onUserUpdate(login, 'login');
          this.setState({ isEditMode: false });
          break;

        case 'password':
          if (oldPassword !== user.password) {
            this.handleInputsReset();
            this.setState({
              isOldPasswordAlertVisible: true,
              oldPasswordAlertText: 'Password is wrong!',
            });
          } else {
            onUserUpdate(newPassword, 'password');
            this.setState({ isEditMode: false });
            this.handleInputsReset();
          }
          break;

        case 'logout':
          onUserLogout();
          break;
        case 'remove':
          onUserRemove();
          break;
        default:
          break;
      }
    } else if (setting === 'cancel') {
      this.setState({ isEditMode: false });
      this.handleInputsReset();
    } else {
      this.setState({ isEditMode: true, editedSetting: setting });
    }
  };

  handleInputsReset = () => {
    this.setState({
      login: '',
      isLoginValid: false,
      isLoginAlertVisible: false,
      loginAlertText: 'Please enter your login',
      oldPassword: '',
      isOldPasswordValid: false,
      isOldPasswordAlertVisible: false,
      oldPasswordAlertText: 'Please enter your old password',
      isOldPasswordPreviewMode: false,
      newPassword: '',
      isNewPasswordValid: false,
      isNewPasswordAlertVisible: false,
      newPasswordAlertText: 'Please enter your new password',
      isNewPasswordPreviewMode: false,
      confirm: '',
      isConfirmValid: false,
      isConfirmAlertVisible: false,
      confirmAlertText: 'Please confirm your password',
      isConfirmPreviewMode: false,
      isConfirmDisabled: true,
    });
  };

  render() {
    const { block, isSidebarVisible, users, loggedUserId } = this.props;
    const {
      isEditMode,
      editedSetting,
      isLoginValid,
      isOldPasswordValid,
      isNewPasswordValid,
      isConfirmValid,
    } = this.state;
    const { login, stats } = users[loggedUserId];
    const userEditButtons = ['login', 'password', 'logout', 'remove'];
    const userEditLabels = [
      'Change your login',
      'Change your password',
      'Log out to main app',
      'Remove your profile',
    ];
    const userConfirmButtons = ['confirm', 'cancel'];
    const statsLabels = {
      finishedTasks: 'Tasks finished:',
      avgTaskTime: 'Average task time:',
      avgBreakTime: 'Average break time:',
      avgTasksPerDay: 'Average tasks per day:',
      dateCreated: 'Profile created at:',
    };
    const statsLabelsKeys = Object.keys(statsLabels);

    const sidebarClass = classNames(styles.container, {
      [styles['container--visible']]: isSidebarVisible,
    });

    const editButtonsClass = classNames(
      styles.userButtons,
      styles['userButtons--edit'],
      {
        [styles['userButtons--visible']]: !isEditMode,
      }
    );

    const confirmButtonsClass = classNames(
      styles.userButtons,
      styles['userButtons--confirm'],
      {
        [styles['userButtons--visible']]: isEditMode,
      }
    );

    return (
      <section className={sidebarClass}>
        {/* USER LOGIN */}
        <h2 className={styles.userLogin}>{login}</h2>

        <UserEdit
          parentName={block}
          state={this.state}
          isEditMode={isEditMode}
          editedSetting={editedSetting}
          onPreviewModeChange={this.handlePasswordPreview}
          onInputBlur={this.handleAlert}
          handleLoginValidation={this.handleLoginValidation}
          handleOldPasswordValidation={this.handleOldPasswordValidation}
          handleNewPasswordValidation={this.handleNewPasswordValidation}
          handleConfirmValidation={this.handleConfirmValidation}
        />

        {/* USER PANEL BUTTONS */}
        <div className={styles.buttons}>
          {/* EDIT BUTTONS */}
          <div className={editButtonsClass}>
            {userEditButtons.map((button, index) => {
              const buttonClass = classNames(
                styles.button,
                styles[`button--${button}`],
                {
                  [styles['button--visible']]: !isEditMode,
                }
              );
              const tabIndexVal = isSidebarVisible && !isEditMode ? '0' : '-1';

              return (
                <button
                  className={buttonClass}
                  key={button}
                  title={userEditLabels[index]}
                  onClick={() => this.handleUserEdit(button)}
                  tabIndex={tabIndexVal}
                >
                  <svg className={styles.svg} viewBox="0 0 100 100">
                    <use href={`${icons}#${button}Edit`}></use>
                  </svg>
                </button>
              );
            })}
          </div>

          {/* CONFIRMATION BUTTONS */}
          <div className={confirmButtonsClass}>
            {userConfirmButtons.map((button) => {
              const isButtonDisabled =
                editedSetting === 'login'
                  ? !isLoginValid
                  : editedSetting === 'password'
                  ? !isOldPasswordValid ||
                    !isNewPasswordValid ||
                    !isConfirmValid
                  : false;
              const isConfirmButtonDisabled =
                isButtonDisabled && button === 'confirm';

              const buttonClass = classNames(
                styles.button,
                styles[`button--${button}`],
                {
                  [styles['button--visible']]: isEditMode,
                  [styles['button--disabled']]: isConfirmButtonDisabled,
                }
              );
              const tabIndexVal = isSidebarVisible && isEditMode ? '0' : '-1';

              return (
                <button
                  className={buttonClass}
                  key={button}
                  onClick={() => this.handleUserEdit(button)}
                  disabled={isConfirmButtonDisabled}
                  tabIndex={tabIndexVal}
                >
                  <svg className={styles.svg} viewBox="0 0 100 100">
                    <use href={`${icons}#${button}Edit`}></use>
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

        {/* USER STATS */}
        <section className={styles.section}>
          <h3 className={styles.heading}>Stats</h3>
          <table className={styles.stats}>
            <caption className={styles.caption}>Stats</caption>
            <thead className={styles.header}>
              <tr className={styles.row}>
                <th className={styles.cell}>Name</th>
                <th className={styles.cell}>Value</th>
              </tr>
            </thead>
            <tbody className={styles.body}>
              {[...statsLabelsKeys].map((key) => (
                <tr className={styles.row} key={key}>
                  <th
                    className={classNames(styles.cell, styles['cell--name'])}
                    scope="row"
                  >
                    {statsLabels[key]}
                  </th>
                  <td
                    className={classNames(styles.cell, styles['cell--value'])}
                  >
                    {stats[key]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* USER COLOR PROFILE */}
        <section className={styles.section}>
          <h3 className={styles.heading}>Color Theme</h3>
          <p className={styles.text}>To be added soon...</p>
        </section>
      </section>
    );
  }
}
export default Sidebar;
