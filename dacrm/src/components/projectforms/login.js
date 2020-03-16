import React from 'react';

export default class Login extends React.Component {
    render() {
        return(
            <div className="loogin__wrap">
                <form className="login__form" onSubmit={e => this.props.submit(e, {login: this.props.login, password: this.props.password})}>
                    <span className="form__name">Войти в Editor</span>
                    <div className="regData">
                        <label className="loginField">
                            <span className="formLogin">Логин:</span>
                            <input type="text" placeholder="Enter login" onChange={(e) => { this.props.inputLogin(e.target.value) }}/>
                        </label>
                        <label className="passwordField">
                            <span className="formPass">Пароль:</span>
                            <input type="password" placeholder="Enter password" onChange={(e) => { this.props.inputPassword(e.target.value)}}/>
                        </label>
                    </div>
                    <div className="startReg">
                        <input type="submit" value="Войти" />
                    </div>
                </form>
            </div>
        )
    }
}
