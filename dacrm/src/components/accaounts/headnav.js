import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab)

const AdminHeader = (props) => {
  return (
      <div className="header-wrap">
        <nav className="header-nav">
          <ul className="nav_list d-flex justify-content-end">
            <li className="header__button button__ava">
              <FontAwesomeIcon icon="user" />
            </li>
            <li className="header__button button_bell">
              <FontAwesomeIcon icon="bell" />
            </li>
            <li className="header__button button_logout"  onClick={props.exit}>
              <FontAwesomeIcon icon="sign-out-alt" />
            </li>
          </ul>
        </nav>
      </div>
  )
}

export default AdminHeader;
