import React from 'react';
import classNames from 'classnames';
import '../scss/UserEdit.scss';

const UserEdit = (props) => {

  const {
    users,
    loggedUserLogin,
    settingBeingEdited,
    onUserLogout,
    onUserRemove,
    editRef
  } = props;


  const userEditClass = classNames('UserEdit', {
    'UserEdit--visible': settingBeingEdited,
    [`UserEdit--${settingBeingEdited}`]: settingBeingEdited
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

      /* USER LOGOUT CONFIRM */
      : settingBeingEdited === 'logout' ?

      <p className="UserEdit__text">
        Are you sure to log out?
      </p>

      : /* USER REMOVE CONFIRM */

      <p className="UserEdit__text">
        Are you sure to remove user?
      </p>
      }
    </div>
  );
}
export default UserEdit;