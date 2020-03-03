import React from 'react';
import classNames from 'classnames';
import UserEdit from './UserEdit';
import icons from '../assets/svg/icons.svg';
import '../scss/Sidebar.scss';

const Sidebar = (props) => {

  const {
    isSidebarVisible,
    settingBeingEdited,
    onEditModeChange,
    users,
    loggedUserLogin,
    onUserLogout,
    onUserRemove
  } = props;

  const { 
    finishedTasks,
    avgTaskTime,
    avgBreakTime,
    avgTasksPerDay
  } = [...users].find(user =>user.login === loggedUserLogin);

  const sidebarClass = classNames('Sidebar', {
    'Sidebar--visible': isSidebarVisible
  })

  return (
    <section className={sidebarClass}>
      {/* USER LOGIN */}
      <h2 className="Sidebar__userLogin">
        {loggedUserLogin}
      </h2>

      <UserEdit
        settingBeingEdited={settingBeingEdited}
        onUserLogout={onUserLogout}
        onUserRemove={onUserRemove}
      />

      {/* USER PANEL BUTTONS */}
      <div className="Sidebar__buttons">
        <button
          className="userButton userButton--login"
          onClick={() => onEditModeChange('login')}
        >
          <svg className="userButton__svg" viewBox="0 0 100 100">
            <use href={`${icons}#loginEdit`}></use>
          </svg>
        </button>
        <button
          className="userButton userButton--password"
          onClick={() => onEditModeChange('password')}
        >
          <svg className="userButton__svg" viewBox="0 0 100 100">
            <use href={`${icons}#passwordEdit`}></use>
          </svg>
        </button>
        <button
          className="userButton userButton--logout"
          onClick={() => onEditModeChange('logout')}
        >
          <svg className="userButton__svg" viewBox="0 0 100 100">
            <use href={`${icons}#userLogout`}></use>
          </svg>
        </button>
        <button
          className="userButton userButton--remove"
          onClick={() => onEditModeChange('remove')}
        >
          <svg className="userButton__svg" viewBox="0 0 100 100">
            <use href={`${icons}#userRemove`}></use>
          </svg>
        </button>
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
export default Sidebar;