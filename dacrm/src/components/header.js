import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return(
      <header>
        <div className="header-wrap d-flex justify-content-end">
          <Link className="header__button authButton btn btn-outline-primary" to="/auth">Войти</Link>
          <Link className="header__button regButton btn btn-outline-primary" to="/">Регистрация</Link>
        </div>
      </header>
    )
  }
}
