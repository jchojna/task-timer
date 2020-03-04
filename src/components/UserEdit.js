import React from 'react';
import classNames from 'classnames';
import '../scss/UserEdit.scss';

const UserEdit = (props) => {

  const {
    users,
    loggedUserLogin,
    userEditMode: { isEditMode, settingBeingEdited }
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
      <button className="UserEdit__confirm">
        Login
      </button>

      : settingBeingEdited === 'password' ?
      /* USER PASSWORD EDIT */
      <button className="UserEdit__confirm">
        Password
      </button>

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