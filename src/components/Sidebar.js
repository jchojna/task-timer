import React from 'react';
import classNames from 'classnames';
import icons from '../assets/svg/icons.svg';
import '../scss/Sidebar.scss';

const Sidebar = (props) => {

  const {
    isSidebarVisible,
    users,
    loggedUserLogin
  } = props;

  const sidebarClass = classNames('Sidebar', {
    'Sidebar--visible': isSidebarVisible
  })

  return (
    <section className={sidebarClass}>
      <h2 className="Sidebar__userLogin">
        {loggedUserLogin}
      </h2>
      <div className="Sidebar__userPanel">
        <button className="userButton userButton--login">
          <svg className="userButton__svg" viewBox="0 0 100 100">
            <use href={`${icons}#loginEdit`}></use>
          </svg>
        </button>
        <button className="userButton userButton--password">
          <svg className="userButton__svg" viewBox="0 0 100 100">
            <use href={`${icons}#passwordEdit`}></use>
          </svg>
        </button>
        <button className="userButton userButton--logout">
          <svg className="userButton__svg" viewBox="0 0 100 100">
            <use href={`${icons}#userLogout`}></use>
          </svg>
        </button>
        <button className="userButton userButton--remove">
          <svg className="userButton__svg" viewBox="0 0 100 100">
            <use href={`${icons}#userRemove`}></use>
          </svg>
        </button>




      </div>








    </section>
  );
}
export default Sidebar;