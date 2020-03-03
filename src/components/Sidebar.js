import React from 'react';
import classNames from 'classnames';
import '../scss/Sidebar.scss';

const Sidebar = (props) => {

  const { isSidebarVisible } = props;

  const sidebarClass = classNames('Sidebar', {
    'Sidebar--visible': isSidebarVisible
  })


  return (
    <div className={sidebarClass}>



    </div>
  );
}
export default Sidebar;