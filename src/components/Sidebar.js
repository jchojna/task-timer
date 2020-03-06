import React, { Component } from 'react';
import classNames from 'classnames';
import UserEdit from './UserEdit';
import icons from '../assets/svg/icons.svg';
import { getCapitalized } from '../lib/handlers.js';
import '../scss/Sidebar.scss';

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
    }
  }

  handleStateChange = (object) => this.setState(object);

  handleAlert = (value, input) => {
    const inputName = getCapitalized(input);
    const alertText = this.getInputAlert(value, input);

    this.setState({
      [`is${inputName}AlertVisible`]: true,
      [`${input}AlertText`]: alertText
    });    
  }

  getInputAlert = (value, input) => {

    const { newPassword } = this.state;
    const isEmpty = value === '';
    const doesContainWhiteSpaces = /\s/g.test(value);
    const isPasswordTooShort = value.length < 6;
    
    switch (input) {
  
      case 'login':

        const { block, users, loggedUserLogin } = this.props;

        const logins = [...users].map(user => user.login);
        const doesLoginExist = [...logins]
        .find(login => login === value && login !== loggedUserLogin);
        const isLoginIncorrect = block === 'loginForm' && !doesLoginExist;
        const isNewLoginIncorrect = (block === 'signupForm' || block === 'userEdit')
        && doesLoginExist;

        return isEmpty
        ? 'Please enter your login' : doesContainWhiteSpaces
        ? 'Login cannot contain any spaces' : isLoginIncorrect
        ? 'There is no user with this login' : isNewLoginIncorrect
        ? 'This login already exist. Try another one' : false;  
  
      case 'password':
      case 'oldPassword':
      case 'newPassword':

        return isEmpty
        ? 'Please enter your password' : doesContainWhiteSpaces
        ? 'Password cannot contain any spaces' : isPasswordTooShort
        ? 'Password should have at least 6 characters' : false;
  
      case 'confirm':
        const doPasswordsMatch = newPassword === value;

        return isEmpty
        ? 'Please confirm your password' : !doPasswordsMatch
        ? 'Passwords do not match!' : false;
  
      default: return false;
    }
  }

  handleLoginValidation = (value) => {
    const isInvalid = this.getInputAlert(value, 'login') ? true : false;
    
    this.setState({
      login: value,
      isLoginValid: !isInvalid,
      isLoginAlertVisible: false
    });
  }

  handleOldPasswordValidation = (value) => {
    const isInvalid = this.getInputAlert(value, 'password') ? true : false;

    this.setState({
      oldPassword: value,
      isOldPasswordValid: !isInvalid,
      isOldPasswordAlertVisible: false,
      isOldPasswordPreviewed: false
    });
  }

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
      isConfirmDisabled: isInvalid
    });
  }

  handleConfirmValidation = (value) => {
    const isInvalid = this.getInputAlert(value, 'confirm') ? true : false;

    this.setState({
      confirm: value,
      isConfirmValid: !isInvalid,
      isConfirmAlertVisible: false,
      isConfirmPreviewed: false
    });
  }

  handlePasswordPreview = (input) => {
    console.log('input', input);
    const inputName = getCapitalized(input);

    this.setState(prevState => ({
      [`is${inputName}PreviewMode`]: !prevState[`is${inputName}PreviewMode`]
    }));
  }

  handleUserEdit = (setting) => {
    const {
      onUserUpdate,
      onUserLogout,
      onUserRemove,
      users,
      loggedUserLogin
    } = this.props;
    const { editedSetting, login, oldPassword, newPassword } = this.state;
    const user = [...users].find(user => user.login === loggedUserLogin);

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
              oldPasswordAlertText: 'Password is wrong!'
            });

          } else {
            onUserUpdate(newPassword, 'password');
            this.setState({ isEditMode: false });
            this.handleInputsReset();
          }
        break;

        case 'logout': onUserLogout(); break;
        case 'remove': onUserRemove(); break;
        default: break;
      }

    } else if (setting === 'cancel') {
      this.setState({ isEditMode: false });
      this.handleInputsReset();

    } else {
      this.setState({ isEditMode: true, editedSetting: setting });
    }
  }

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
      isConfirmDisabled: true
    });
  }

  render() {

    const {
      block,
      isSidebarVisible,
      users,
      loggedUserLogin
    } = this.props;

    const {
      isEditMode,
      editedSetting,
      isLoginValid,
      isOldPasswordValid,
      isNewPasswordValid,
      isConfirmValid
    } = this.state;

    const { stats } = [...users].find(user =>user.login === loggedUserLogin);
    
    const userEditButtons = ['login', 'password', 'logout', 'remove'];
    const userConfirmButtons = ['confirm', 'cancel'];
      
    const statsLabels = {
      finishedTasks: 'Tasks finished:',
      avgTaskTime: 'Average task time:',
      avgBreakTime: 'Average break time:',
      avgTasksPerDay: 'Average tasks per day:',
      dateCreated: 'Profile created at:'
    }
    const statsLabelsKeys = Object.keys(statsLabels);

    //#region [ Horizon ] CLASS NAMES
  
    const sidebarClass = classNames('Sidebar', {
      'Sidebar--visible': isSidebarVisible
    });
  
    const editButtonsClass = classNames('userButtons', 'userButtons--edit', {
      'userButtons--visible': !isEditMode
    });
  
    const confirmButtonsClass = classNames('userButtons', 'userButtons--confirm', {
      'userButtons--visible': isEditMode
    });

    //#endregion CLASS NAMES
  
    return (
      <section className={sidebarClass}>
        {/* USER LOGIN */}
        <h2 className="Sidebar__userLogin">
          {loggedUserLogin}
        </h2>
  
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
        <div className="Sidebar__buttons">
  
          {/* EDIT BUTTONS */}
          <div className={editButtonsClass}>
            {
            userEditButtons.map(button => {
              
              const buttonClass = classNames(
              'userButtons__button',
              `userButtons__button--${button}`, {
                'userButtons__button--visible': !isEditMode
              });
              
              return (
                <button
                  className={buttonClass}
                  key={button}
                  onClick={() => this.handleUserEdit(button)}
                >
                  <svg className="userButtons__svg" viewBox="0 0 100 100">
                    <use href={`${icons}#${button}Edit`}></use>
                  </svg>
                </button>
              )
            })
            }
          </div>
  
          {/* CONFIRMATION BUTTONS */}
          <div className={confirmButtonsClass}>
            {
            userConfirmButtons.map(button => {

              const isButtonDisabled = editedSetting === 'login'
              ? !isLoginValid
              : editedSetting === 'password'
              ? !isOldPasswordValid || !isNewPasswordValid || !isConfirmValid
              : false;
              const isConfirmButtonDisabled = isButtonDisabled && button === 'confirm';
  
              const buttonClass = classNames(
              'userButtons__button',
              `userButtons__button--${button}`, {
                'userButtons__button--visible': isEditMode,
                'userButtons__button--disabled': isConfirmButtonDisabled
              });
              
              return (
                <button
                  className={buttonClass}
                  key={button}
                  onClick={() => this.handleUserEdit(button)}
                  disabled={isConfirmButtonDisabled}
                >
                  <svg className="userButtons__svg" viewBox="0 0 100 100">
                    <use href={`${icons}#${button}Edit`}></use>
                  </svg>
                </button>
              )
            })
            }
          </div>
        </div>
  
        {/* USER STATS */}
        <section className="Sidebar__section">
          <h3 className="Sidebar__heading">Stats</h3>
          <table className="stats">
            <caption className="stats__caption visuallyhidden">Stats</caption>
            <thead className="stats__header visuallyhidden">
              <tr className="stats__row">
                <th className="stats__cell">Name</th>
                <th className="stats__cell">Value</th>
              </tr>
            </thead>
            <tbody className="stats__body">
            {
              [...statsLabelsKeys].map(key => 

                <tr className="stats__row" key={key}>
                  <th className="stats__cell stats__cell--name" scope="row">
                    {statsLabels[key]}
                  </th>
                  <td className="stats__cell stats__cell--value">
                    {stats[key]}
                  </td>
                </tr>
              )
            }
            </tbody>
          </table>
        </section>
  
        {/* USER COLOR PROFILE */}
        <section className="Sidebar__section">
          <h3 className="Sidebar__heading">Color Theme</h3>
          <p className="Sidebar__text">To be added soon...</p>
        </section>
      </section>
    );
  }
}
export default Sidebar;