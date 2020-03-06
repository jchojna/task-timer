import React from 'react';
import classNames from 'classnames';
import UserInput from './UserInput';
import '../scss/UserEdit.scss';

const UserEdit = (props) => {

  const {
    parentName,
    isEditMode,
    editedSetting,
    onPreviewModeChange,
    onInputBlur,
    handleLoginValidation,
    handleOldPasswordValidation,
    handleNewPasswordValidation,
    handleConfirmValidation,

    state: {
      login,
      isLoginValid,
      isLoginAlertVisible,
      loginAlertText,
      oldPassword,
      isOldPasswordValid,
      isOldPasswordAlertVisible,
      oldPasswordAlertText,
      isOldPasswordPreviewMode,
      newPassword,
      isNewPasswordValid,
      isNewPasswordAlertVisible,
      newPasswordAlertText,
      isNewPasswordPreviewMode,
      confirm,
      isConfirmValid,
      isConfirmAlertVisible,
      confirmAlertText,
      isConfirmPreviewMode,
      isConfirmDisabled
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
          inputId={`${parentName}Login`}
          inputName="login"
          parentName={parentName}
          value={login}
          label="New Login:"
          isInputValid={isLoginValid}
          isAlertVisible={isLoginAlertVisible}
          alertText={loginAlertText}
          onInputBlur={onInputBlur}
          onInputChange={handleLoginValidation}
        />
      </div>

      : editedSetting === 'password' ?
      /* USER PASSWORD EDIT */
      <div className={userEditClass}>
        {/* OLD PASSWORD */}
        <UserInput
          inputId={`${parentName}OldPassword`}
          inputName="oldPassword"
          parentName={parentName}
          value={oldPassword}
          label="Old Password:"
          isInputValid={isOldPasswordValid}
          isAlertVisible={isOldPasswordAlertVisible}
          alertText={oldPasswordAlertText}
          isPreviewMode={isOldPasswordPreviewMode}
          onPreviewModeChange={onPreviewModeChange}
          onInputBlur={onInputBlur}
          onInputChange={handleOldPasswordValidation}
        />
        {/* NEW PASSWORD */}
        <UserInput
          inputId={`${parentName}NewPassword`}
          inputName="newPassword"
          parentName={parentName}
          value={newPassword}
          label="New Password:"
          isInputValid={isNewPasswordValid}
          isAlertVisible={isNewPasswordAlertVisible}
          alertText={newPasswordAlertText}
          isPreviewMode={isNewPasswordPreviewMode}
          onPreviewModeChange={onPreviewModeChange}
          onInputBlur={onInputBlur}
          onInputChange={handleNewPasswordValidation}
        />
        {/* CONFIRM PASSWORD */}
        <UserInput
          inputId={`${parentName}Confirm`}
          inputName="confirm"
          parentName={parentName}
          value={confirm}
          label="Confirm:"
          isInputValid={isConfirmValid}
          isAlertVisible={isConfirmAlertVisible}
          alertText={confirmAlertText}
          isDisabled={isConfirmDisabled}
          isPreviewMode={isConfirmPreviewMode}
          onPreviewModeChange={onPreviewModeChange}
          onInputBlur={onInputBlur}
          onInputChange={handleConfirmValidation}
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