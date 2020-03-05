import React from 'react';
import classNames from 'classnames';
import UserInput from './UserInput';
import '../scss/UserEdit.scss';

const UserEdit = (props) => {

  const {
    users,
    loggedUserLogin,
    onInputChange,
    state: {
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
    }
  } = props;


  const userEditClass = classNames('UserEdit', {
    'UserEdit--hidden': !isEditMode,
    [`UserEdit--${editedSetting}`]: isEditMode
  })


  return (
    <React.Fragment>
      {
      editedSetting === 'login' ?
      /* USER LOGIN EDIT */
      <div className={userEditClass}>
        <UserInput
          block="userEdit"
          modifier="login"
          value={Login}
          users={users}
          loggedUserLogin={loggedUserLogin}
          label="New Login:"
          isInputValid={isLoginValid}
          onInputChange={onInputChange}
        />
      </div>

      : editedSetting === 'password' ?
      /* USER PASSWORD EDIT */
      <div className={userEditClass}>
        <UserInput
          block="userEdit"
          modifier="password"
          value={password}
          users={users}
          label="Old Password:"
          isInputValid={isPasswordValid}
          onInputChange={onInputChange}
        />
        <UserInput
          block="userEdit"
          modifier="newPassword"
          value={newPassword}
          users={users}
          label="New Password:"
          isInputValid={isNewPasswordValid}
          onInputChange={onInputChange}
        />
        <UserInput
          block="userEdit"
          modifier="confirm"
          value={confirmPassword}
          users={users}
          label="Confirm:"
          isInputValid={isConfirmValid}
          onInputChange={onInputChange}
        />
      </div>

      : editedSetting === 'logout' ?
      /* USER LOGOUT CONFIRM */
      <div className={userEditClass}>
        <p className="UserEdit__text">
          Log out?
        </p>
      </div>

      :
      /* USER REMOVE CONFIRM */
      <div className={userEditClass}>
        <p className="UserEdit__text">
          Remove user?
        </p>
      </div>
      }
    </React.Fragment>
  );
}
export default UserEdit;