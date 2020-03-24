import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getTasks from '../../../actions/getUserTask';
import submitTask from '../../../actions/EditorTask';
import WorksList from './works';
import InWorks from './inWorks';
import InCheck from './inCheck';
import Revision from './revision';
import FinalWorks from './final';

const mapStateProps = state => {
    return {
        tasks: state.editorTasks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTasks: bindActionCreators(getTasks, dispatch),
        submitTask: bindActionCreators(submitTask, dispatch),
    }
}

class Tasks extends React.Component {

    /*componentDidMount() {
        this.props.getTasks({id: localStorage.getItem('user'), token: localStorage.getItem('token')})
    }*/

    componentDidMount() {
        this.interval = setInterval(() => { this.props.getTasks({id: localStorage.getItem('user'), token: localStorage.getItem('token')}) }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return(
            <div className="works__wrap">
                <WorksList works={this.props.tasks.allTask} submit={this.props.submitTask}/>
                <InWorks works={this.props.tasks.inWorks} submit={this.props.submitTask}/>
                <InCheck works={this.props.tasks.inChecks}/>
                <Revision works={this.props.tasks.completion} submit={this.props.submitTask}/>
                <FinalWorks works={this.props.tasks.final}/>
            </div>
        )
    }
}

export default connect(mapStateProps, mapDispatchToProps)(Tasks);
