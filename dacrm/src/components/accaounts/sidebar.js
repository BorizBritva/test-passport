import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import logo from '../../assest/da-logo_100_white.png';

library.add(fas, fab)

const SideBar = () => {
  return (
    <aside className="main-sidebar px-0 col-12 col-md-3 col-lg-2">
      <span className="sidebar__logo">
        <img src={logo} />
      </span>
      <nav className="sidebar-nav">
        <ul className="sidebar__list">
          <li className="sidebar__button button_home">
            <Link to={`/`} className="sdb__link">
              <FontAwesomeIcon icon="home" />
              <div className="sdb__button-name">Home</div>
            </Link>
          </li>
          <li className="sidebar__button">
            <Link to={`/`} className="sdb__link">
              <FontAwesomeIcon icon="tasks" />
              <div className="sdb__button-name">Tasks</div>
            </Link>
          </li>
          <li className="sidebar__button">
            <Link to={`/`} className="sdb__link">
              <FontAwesomeIcon icon="id-card" />
              <div className="sdb__button-name">Profile</div>
            </Link>
          </li>
          <li className="sidebar__button"></li>
        </ul>
      </nav>
    </aside>
  )
}

export default SideBar;
