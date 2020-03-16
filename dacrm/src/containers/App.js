import React, {Fragment} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../components/projectforms/login';
import {submitLogin, inputLogin, inputPassword} from '../actions/actionLogin';

const history = createBrowserHistory();

const mapStateProps = state => {
    return {
        login: state.login,
        password: state.password,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitLogin: bindActionCreators(submitLogin, dispatch),
        inputLogin: bindActionCreators(inputLogin, dispatch),
        inputPassword: bindActionCreators(inputPassword, dispatch)
    };
}

class App extends React.Component {
    render() {
        return (
            <>
                <Login login={this.props.login} password={this.props.password} submit={this.props.submitLogin} inputLogin={this.props.inputLogin} inputPassword={this.props.inputPassword}/>
            </>
        )
    }
}

export default connect(mapStateProps, mapDispatchToProps)(App);
