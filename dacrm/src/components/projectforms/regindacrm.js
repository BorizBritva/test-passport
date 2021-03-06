import React, {Fragment} from 'react';
import Header from '../header';

export default class RegForm extends React.Component {

    render() {

        const message = (mess) => { if (mess && mess.length > 0) { return <div className="alert alert-info" role="alert">{mess}</div> } }

        return(
          <>
          <Header />
          <div className="container">
          <div className="reg__wrap row d-flex justify-content-center">
          <form className="reg__form" onSubmit={e => this.props.submit(e, {login: this.props.login, password: this.props.password, name: this.props.name, phone: this.props.phone})}>
          <h1 className="form__name">Регистрация Editor</h1>
              <div className="form__data form__data_reg">
                  <label className="login_field input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="login-label input-group-text" id="inputGroup-sizing-default">Логин:</span>
                      </div>
                      <input className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="text" placeholder="Enter login" onChange={(e) => { this.props.inputLogin(e.target.value) }} />
                  </label>
                  <label className="pass_field input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="pass-label input-group-text" id="inputGroup-sizing-default">Пароль:</span>
                      </div>
                      <input className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="password" placeholder="Enter password" onChange={(e) => { this.props.inputPassword(e.target.value)}} />
                  </label>
                </div>
                <label className="name_field input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="name-label input-group-text" id="inputGroup-sizing-default">Имя:</span>
                    </div>
                    <input className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="text" placeholder="Enter your name"  onChange={(e) => { this.props.inputName(e.target.value)}} />
                </label>
                <label className="contact_field input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="phone-label input-group-text" id="inputGroup-sizing-default">Телефон:</span>
                    </div>
                    <input className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="text" placeholder="Enter phone number"  onChange={(e) => { this.props.inputPhone(e.target.value)}} />
                </label>
                <div className="form__button-wrap">
                  <input type="submit" className="btn btn-primary btn-lg btn-block" value="Зарегистрироваться" />
                </div>
                <div className="login_error">
                  {message(this.props.mes)}
                </div>
           </form>
          </div>
          </div>
          </>
        )
    }
}
