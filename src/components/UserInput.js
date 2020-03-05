import React, { Component } from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/UserInput.scss';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputId: '',
      modifierName: '',
      isAlertVisible: false,
      alertText: '',
      isPasswordPreviewed: false
    }
  }

  componentDidMount() {
    const { block, modifier } = this.props;
    const modifierName = modifier.charAt(0).toUpperCase() + modifier.substring(1);
    const inputId = block + modifierName;
    const alertText = modifier === 'login'
    ? 'Please enter your login' : modifier === 'password'
    ? 'Please enter your password' : modifier === 'confirm'
    ? 'Please confirm password' : '';

    this.setState({ modifierName, inputId, alertText });
  }

  handleInputChange = (value) => {
    const { modifier, onInputChange } = this.props;

    switch (modifier) {

      case 'login':
        const isLoginValid = this.handleLoginValidation(value);
        onInputChange({ [modifier]: value, isLoginValid });
      break;

      case 'password':
        const isPasswordValid = this.handlePasswordValidation(value);
        onInputChange({
          [modifier]: value,
          isPasswordValid,
          confirm: '',
          isConfirmValid: false,
          hasLogInFailed: false
        });
      break;

      case 'confirm':
        const isConfirmValid = this.handleConfirmValidation(value);
        onInputChange({ [modifier]: value, isConfirmValid });
      break;

      default: break;
    }
  }
  
  handleInputBlur = () => {
    const { isInputValid } = this.state;
    if (!isInputValid) this.setState({ isAlertVisible: true });
  }

  handleLoginValidation = (value) => {

    const { block, users } = this.props;
    const logins = [...users].map(user => user.login);

    const isEmpty = value === '';
    const doesContainWhiteSpaces = /\s/g.test(value);
    const doesLoginExist = [...logins].find(login => login === value);
    const isLoginIncorrect = block === 'loginForm' && !doesLoginExist;
    const isNewLoginIncorrect = block === 'signupForm' && doesLoginExist;

    // handle alert text
    const alertText = isEmpty ? 'Please enter your login' :
    doesContainWhiteSpaces ? 'Login cannot contain any spaces' :
    isLoginIncorrect ? 'There is no user with this login' :
    isNewLoginIncorrect ? 'This login already exist. Try another one' : '';

    const isInputValid = !isEmpty
    && !doesContainWhiteSpaces
    && !isLoginIncorrect
    && !isNewLoginIncorrect;
    
    this.setState({
      isInputValid,
      isAlertVisible: false,
      alertText: isInputValid ? this.state.alertText : alertText
    });
    return isInputValid;
  }

  handlePasswordValidation = (value) => {
    const isEmpty = value === '';
    const doesContainWhiteSpaces = /\s/g.test(value);
    const isPasswordTooShort = value.length < 6;
    
    // handle alert text
    const alertText = isEmpty ? 'Please enter your password' :
    doesContainWhiteSpaces ? 'Password cannot contain any spaces' :
    isPasswordTooShort ? 'Password should have at least 6 characters' : '';

    const isInputValid = !isEmpty && !doesContainWhiteSpaces && !isPasswordTooShort;
    
    this.setState({
      isInputValid,
      isAlertVisible: false,
      alertText: isInputValid ? this.state.alertText : alertText,
      isPasswordPreviewed: false
    });
    return isInputValid;
  }

  handleConfirmValidation = (value) => {
    const { alertText } = this.state;
    const { password } = this.props;
    const isEmpty = value === '';
    const doPasswordsMatch = password === value;
    const confirmAlertText = isEmpty ? 'Please confirm your password' :
    !doPasswordsMatch ? 'Passwords do not match' : '';
    const isInputValid = !isEmpty && doPasswordsMatch;

    this.setState({
      isInputValid,
      isAlertVisible: false,
      alertText: isInputValid ? alertText : confirmAlertText,
      isPasswordPreviewed: false
    });
    return isInputValid;
  }

  handlePasswordPreview = () => {
    this.setState(prevState => ({
      isPasswordPreviewed: !prevState.isPasswordPreviewed
    }));
  }

  render() {

    const {
      block,
      modifier,
      value,
      isInputValid,
      isPasswordValid
    } = this.props;

    const {
      modifierName,
      inputId,
      isAlertVisible,
      alertText,
      isPasswordPreviewed
    } = this.state;
  
    // #region [ Horizon ] CLASS NAMES

    const isConfirmPassword = inputId === 'signupFormConfirm';
    const isConfirmDisabled = !isPasswordValid && isConfirmPassword;
    const isConfirmEmpty = value === '' && isConfirmPassword;

    const userInputClass = `UserInput UserInput--${modifier}`;
  
    const labelClass = classNames(
      'UserInput__label',
      `UserInput__label--${block}`,
      `UserInput__label--${modifier}`, {
      'UserInput__label--disabled': isConfirmDisabled
    });
  
    const inputClass = classNames(
      'UserInput__input',
      `UserInput__input--${block}`,
      `UserInput__input--${modifier}`, {
      'UserInput__input--disabled': isConfirmDisabled
    });

    const inputType = modifier === 'login'
    ? 'text'
    : isPasswordPreviewed ? 'text' : 'password'
  
    const alertBoxClass = classNames(
      'UserInput__alertBox',
      `UserInput__alertBox--${block}`,
      `UserInput__alertBox--${modifier}`, {
      'UserInput__alertBox--visible': !isInputValid
      && isAlertVisible
      && !isConfirmDisabled
      && !isConfirmEmpty
    });
  
    const alertClass = `UserInput__alert UserInput__alert--${modifier}`;
    const iconsClass = `UserInput__icons UserInput__icons--${modifier}`;

    const passedClass = classNames(
      'inputPassed',
      `inputPassed--${block}`, {
      'inputPassed--visible': isInputValid
    });

    const previewClass = classNames(
      'previewPassword',
      `previewPassword--${block}`, {
      'previewPassword--active': isPasswordPreviewed
      && !isConfirmDisabled
      && !isConfirmEmpty,
      'previewPassword--disabled': isConfirmDisabled
    });

    // #endregion
    
    return (
      <div className={userInputClass}>
        {/* LABEL */}
        <label htmlFor={inputId} className={labelClass}>
          {`${modifierName}:`}
        </label>

        {/* INPUT */}
        <input
          id={inputId}
          type={inputType}
          name={inputId}
          value={value}
          onChange={(e) => this.handleInputChange(e.target.value)}
          className={inputClass}
          spellCheck="false"
          maxLength="20"
          disabled={isConfirmDisabled}
          onBlur={this.handleInputBlur}
        />

        {/* ALERT */}
        <div className={alertBoxClass}>
          <p className={alertClass}>{alertText}</p>
        </div>

        {/* INDICATORS */}
        <div className={iconsClass}>
          {
          modifier === 'password' || modifier === 'confirm'
          ? <button
              type="button"
              className={previewClass}
              onClick={this.handlePasswordPreview}
            >
              <svg className="previewPassword__svg" viewBox="0 0 100 100">
                <use href={`${icons}#preview`} />
              </svg>
            </button>
          : <div className="empty"></div>
          }
          {
          block === 'loginForm' && modifier === 'password'
          ? <div className="empty"></div>
          : <div className={passedClass}>
              <svg className="inputPassed__svg" viewBox="0 0 100 100">
                <use href={`${icons}#passed`} />
              </svg>
            </div>
          }
        </div>
      </div>
    );
  }
}
export default UserInput;