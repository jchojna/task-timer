import React from 'react';
import classNames from 'classnames';
import UserEdit from './UserEdit';
import icons from '../assets/svg/icons.svg';
import '../scss/Sidebar.scss';

const Sidebar = (props) => {

  const {
    isSidebarVisible,
    userEditMode,
    userEditMode: { isEditMode },
    onEditModeChange,
    users,
    loggedUserLogin
  } = props;

  const { 
    finishedTasks,
    avgTaskTime,
    avgBreakTime,
    avgTasksPerDay
  } = [...users].find(user =>user.login === loggedUserLogin);

  const userEditButtons = ['login', 'password', 'logout', 'remove'];
  const userConfirmButtons = ['confirm', 'cancel'];

  const sidebarClass = classNames('Sidebar', {
    'Sidebar--visible': isSidebarVisible
  });

  const editButtonsClass = classNames('userButtons', 'userButtons--edit', {
    'userButtons--visible': !isEditMode
  });

  const confirmButtonsClass = classNames('userButtons', 'userButtons--confirm', {
    'userButtons--visible': isEditMode
  });

  return (
    <section className={sidebarClass}>
      {/* USER LOGIN */}
      <h2 className="Sidebar__userLogin">
        {loggedUserLogin}
      </h2>

      <UserEdit
        userEditMode={userEditMode}
      />

      {/* USER PANEL BUTTONS */}
      <div className="Sidebar__buttons">

        {/* EDIT BUTTONS */}
        <div className={editButtonsClass}>
          {
          userEditButtons.map(button => {

            const buttonClass = classNames('userButtons__button',
            `userButtons__button--${button}`, {
              'userButtons__button--visible': !isEditMode
            });
            
            return (
              <button
                className={buttonClass}
                key={button}
                onClick={() => onEditModeChange(button)}
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

            const buttonClass = classNames('userButtons__button',
            `userButtons__button--${button}`, {
              'userButtons__button--visible': isEditMode
            });
            
            return (
              <button
                className={buttonClass}
                key={button}
                onClick={() => onEditModeChange(button)}
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
export default Sidebar;