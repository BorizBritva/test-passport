import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Fragment} from 'react';
import './home.sass';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../components/projectforms/login';
import RegForm from '../components/projectforms/regindacrm';
import {registration, submitLogin, inputLogin, inputPassword, inputName, inputPhone} from '../actions/actionLogin';
import Header from '../components/header';
import Editor from '../components/editor';
import Accounts from '../components/accaounts';

const history = createBrowserHistory();

const mapStateProps = state => {
    return {
        login: state.login,
        password: state.password,
        name: state.name,
        phone: state.phone,
        error: state.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registration: bindActionCreators(registration, dispatch),
        submitLogin: bindActionCreators(submitLogin, dispatch),
        inputLogin: bindActionCreators(inputLogin, dispatch),
        inputPassword: bindActionCreators(inputPassword, dispatch),
        inputName: bindActionCreators(inputName, dispatch),
        inputPhone: bindActionCreators(inputPhone, dispatch),
    };
}

class App extends React.Component {
    render() {
        return (
            <>
            <Router history={ history }>
                <Switch>
                  <RegForm path="/" exact  login={this.props.login}
                                           password={this.props.password}
                                           name={this.props.name}
                                           phone={this.props.phone}
                                           inputLogin={this.props.inputLogin}
                                           inputPassword={this.props.inputPassword}
                                           inputName={this.props.inputName}
                                           inputPhone={this.props.inputPhone}
                                           submit={this.props.registration}
                  />
                  <Route path="/auth" exact render={() => <Login login={this.props.login}
                                                                 password={this.props.password}
                                                                 submit={this.props.submitLogin}
                                                                 inputLogin={this.props.inputLogin}
                                                                 inputPassword={this.props.inputPassword}
                                                                 err={this.props.error}
                                                          /> }
                   />
                   <Route path="/dacrm/user/edit=:id" exact component={Editor} />
                   <Route path="/dacrm/accounts/acc=:id" exact component={Accounts} />
                </Switch>
            </Router>
            </>
        )
    }
}

export default connect(mapStateProps, mapDispatchToProps)(App);
