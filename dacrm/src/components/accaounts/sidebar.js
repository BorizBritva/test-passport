import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab)

const SideBar = () => {
  return (
    <aside className="main-sidebar px-0 col-12 col-md-3 col-lg-2">
      <span className="sidebar__logo">AmoCRM PZDC NAH</span>
      <nav className="sidebar-nav">
        <ul className="sidebar__list">
          <li className="sidebar__button button_home">
            <Link className="sdb-link" to="/">
              <FontAwesomeIcon icon="home" />
              <span className="sdb__button-name">Home</span>
            </Link>
          </li>
          <li className="sidebar__button">
            <Link className="sdb-link" to="/">
              <FontAwesomeIcon icon="tasks" />
              <span className="sdb__button-name">Tasks</span>
            </Link>
          </li>
          <li className="sidebar__button">
            <Link className="sdb-link" to="/">
              <FontAwesomeIcon icon="id-card" />
              <span className="sdb__button-name">Profile</span>
            </Link>
          </li>
          <li className="sidebar__button"></li>
        </ul>
      </nav>
    </aside>
  )
}

export default SideBar;
