import React, {Fragment} from 'react';
import Header from '../header';

export default class Login extends React.Component {
    render() {

        const error = (err) => { if (err && err.length > 0) { return <div className="alert alert-danger" role="alert">{err}</div> }}

        return(
          <>
          <Header />
          <div className="container">
            <div className="login__wrap row d-flex justify-content-center">
                <form className="login__form col col-lg-4" onSubmit={e => this.props.submit(e, {login: this.props.login, password: this.props.password})}>
                    <div className="form-group">
                    <h1 className="form__name h1">Войти в Editor</h1>
                    <div className="form__data form__data_login">
                        <label className="login_field input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="login-label input-group-text" id="inputGroup-sizing-default">Логин:</span>
                            </div>
                          <input className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="text" placeholder="Enter login" onChange={(e) => { this.props.inputLogin(e.target.value) }}/>
                        </label>
                        <label className="pass_field input-group mb-3">
                            <div className="input-group-prepend">
                              <span className="pass-label input-group-text" id="inputGroup-sizing-default">Пароль:</span>
                            </div>
                            <input className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" type="password" placeholder="Enter password" onChange={(e) => { this.props.inputPassword(e.target.value)}}/>
                        </label>
                    </div>
                    <div className="form__button-wrap">
                        <input type="submit" className="btn btn-primary btn-lg btn-block" value="Войти" />
                    </div>
                    <div className="login_error">
                      {error(this.props.err)}
                    </div>
                    </div>
                </form>
            </div>
            </div>
            </>
        )
    }
}
