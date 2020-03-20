import React, {Fragment} from 'react';
import './tasks.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getTasks from '../../../actions/getTasks';
import submitTask from '../../../actions/AdminTask';
import WorksList from './works';
import ConsList from './considerations';
import StatusList from './status';

const mapStateProps = state => {
    return {
        tasks: state.accaunTasks
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
        console.log(this.props.tasks);
        return(
            <div className="works__wrap">
                <WorksList works={this.props.tasks.works} submit={this.props.submitTask}/>
                <ConsList cons={this.props.tasks.considerations} users={this.props.tasks.editors} submit={this.props.submitTask}/>
                <StatusList works={this.props.tasks.status}/>
            </div>
        )
    }
}

export default connect(mapStateProps, mapDispatchToProps)(Tasks);
