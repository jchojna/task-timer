import React, { Component } from 'react';
import classNames from 'classnames';
import UserEdit from './UserEdit';
import icons from '../assets/svg/icons.svg';
import '../scss/Sidebar.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      editedSetting: null,
      login: '',
      password: '',
      newPassword: '',
      confirmPassword: '',
      isLoginValid: false,
      isPasswordValid: false,
      isNewPasswordValid: false,
      isConfirmValid: false
    }
  }
  /* inputId: '',
  modifierName: '',
  isAlertVisible: false,
  alertText: '',
  isPasswordPreviewed: false */

  handleStateChange = (object) => this.setState(object);

  handleUserEdit = (setting) => {
    const { onUserLogout, onUserRemove } = this.props;
    const { editedSetting } = this.state;

    if (setting === 'confirm') {

      switch (editedSetting) {

        case 'login':
          console.log('login updated');
          this.setState({
            

            isEditMode: false
          });
        break;

        case 'password':
          console.log('password updated');
          this.setState({


            isEditMode: false
          });
        break;

        case 'logout': onUserLogout(); break;
        case 'remove': onUserRemove(); break;
        default: break;
      }

    } else if (setting === 'cancel') {
      this.setState({ isEditMode: false });

    } else {
      this.setState({ isEditMode: true, editedSetting: setting });
    }
  }

  render() {

    const {
      isSidebarVisible,
      users,
      loggedUserLogin
    } = this.props;

    const {
      isEditMode,
      editedSetting,
      Login,
      isLoginValid,
      password,
      isPasswordValid,
      newPassword,
      isNewPasswordValid,
      confirmPassword,
      isConfirmValid
    } = this.state;
  
    const { 
      finishedTasks,
      avgTaskTime,
      avgBreakTime,
      avgTasksPerDay
    } = [...users].find(user =>user.login === loggedUserLogin);
  
    const userEditButtons = ['login', 'password', 'logout', 'remove'];
    const userConfirmButtons = ['confirm', 'cancel'];

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
          state={this.state}
          users={users}
          loggedUserLogin={loggedUserLogin}
          onInputChange={this.handleStateChange}
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
              ? !isPasswordValid || !isNewPasswordValid || !isConfirmValid
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
              {/* TASKS FINISHED */}
              <tr className="stats__row">
                <th className="stats__cell stats__cell--name" scope="row">
                  Tasks finished:
                </th>
                <td className="stats__cell stats__cell--value">
                  {finishedTasks}
                </td>
              </tr>
              {/* AVERAGE TASK TIME */}
              <tr className="stats__row">
                <th className="stats__cell stats__cell--name" scope="row">
                  Average task time:
                </th>
                <td className="stats__cell stats__cell--value">
                  {avgTaskTime}
                </td>
              </tr>
              {/* AVERAGE BREAK TIME */}
              <tr className="stats__row">
                <th className="stats__cell stats__cell--name" scope="row">
                  Average break time:
                </th>
                <td className="stats__cell stats__cell--value">
                  {avgBreakTime}
                </td>
              </tr>
              {/* AVERAGE TASKS PER DAY */}
              <tr className="stats__row">
                <th className="stats__cell stats__cell--name" scope="row">
                  Average tasks per day:
                </th>
                <td className="stats__cell stats__cell--value">
                  {avgTasksPerDay}
                </td>
              </tr>
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