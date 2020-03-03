import React from 'react';
import classNames from 'classnames';
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
    <div className={sidebarClass}>
      <h2 className="Sidebar__userLogin">
        {loggedUserLogin}
      </h2>








    </div>
  );
}
export default Sidebar;