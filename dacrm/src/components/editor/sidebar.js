import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import logo from '../../assest/da-logo_100_white.png';

library.add(fas, fab)

export default class SideBar extends React.Component {

    render() {
        return (
          <aside className="main-sidebar px-0 col-12 col-md-2 col-lg-2">
            <span className="sidebar__logo">
              <img src={logo} />
            </span>
            <nav className="sidebar-nav">
              <ul className="sidebar__list">
                <li className="sidebar__button button_home" onClick={() => {this.props.changeComponent(this.props.homePage)}}>
                  <div className="sdb__link">
                    <FontAwesomeIcon icon="home" />
                    <div className="sdb__button-name">Home</div>
                  </div>
                </li>
                <li className="sidebar__button" onClick={() => {this.props.changeComponent(this.props.taskPage)}}>
                  <div className="sdb__link">
                    <FontAwesomeIcon icon="tasks" />
                    <div className="sdb__button-name">Tasks</div>
                  </div>
                </li>
                <li className="sidebar__button" onClick={() => {this.props.changeComponent(this.props.infoCard)}}>
                  <div className="sdb__link">
                    <FontAwesomeIcon icon="id-card" />
                    <div className="sdb__button-name">Profile</div>
                  </div>
                </li>
                <li className="sidebar__button"></li>
              </ul>
            </nav>
          </aside>
        )
    }

}
