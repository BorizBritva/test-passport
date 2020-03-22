import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getTasks from '../../../actions/getUserTask';
import submitTask from '../../../actions/EditorTask';
import WorksList from './works';
import InWorks from './inWorks';
import InCheck from './inCheck';

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

    componentDidMount() {
        this.props.getTasks({id: localStorage.getItem('user'), token: localStorage.getItem('token')})
    }

    render() {
        return(
            <div className="works__wrap">
                <WorksList works={this.props.tasks.allTask} submit={this.props.submitTask}/>
                <InWorks works={this.props.tasks.inWorks} submit={this.props.submitTask}/>
                <InCheck works={this.props.tasks.inChecks}/>
            </div>
        )
    }
}

export default connect(mapStateProps, mapDispatchToProps)(Tasks);
