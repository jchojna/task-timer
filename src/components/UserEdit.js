import React from 'react';
import classNames from 'classnames';
import UserInput from './UserInput';
import '../scss/UserEdit.scss';

const UserEdit = (props) => {

  const {
    users,
    loggedUserLogin,
    userEditMode: {
      isEditMode,
      settingBeingEdited,
      isNewLoginValid,
      isOldPasswordValid,
      isNewPasswordValid,
      isConfirmPasswordValid
    }
  } = props;


  const userEditClass = classNames('UserEdit', {
    'UserEdit--hidden': !isEditMode,
    [`UserEdit--${settingBeingEdited}`]: isEditMode
  })


  return (
    <div className={userEditClass}>
      {
      settingBeingEdited === 'login' ?
      /* USER LOGIN EDIT */
      <UserInput
        block="UserEdit"
        modifier="login"
        //value={login}
        type="text"
        isInputValid={isNewLoginValid}
        //isAlertVisible={isLoginAlertVisible}
        //alertText={loginAlertText}
        onInputChange={this.handleLoginValidation}
        onInputBlur={this.handleAlerts}
      />

      : settingBeingEdited === 'password' ?
      /* USER PASSWORD EDIT */
      <p className="UserEdit__text">
        Password edit
      </p>

      : settingBeingEdited === 'logout' ?
      /* USER LOGOUT CONFIRM */
      <p className="UserEdit__text">
        Log out?
      </p>

      : settingBeingEdited === 'remove' ?
      /* USER REMOVE CONFIRM */
      <p className="UserEdit__text">
        Remove user?
      </p>

      :
      <div className="empty"></div>
      }
    </div>
  );
}
export default UserEdit;