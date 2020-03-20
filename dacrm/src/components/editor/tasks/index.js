import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getTasks from '../../../actions/getUserTask';
import WorksList from './works';

const mapStateProps = state => {
    return {
        tasks: state.editorTasks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTasks: bindActionCreators(getTasks, dispatch)
    }
}

class Tasks extends React.Component {

    componentDidMount() {
        this.props.getTasks({id: localStorage.getItem('user'), token: localStorage.getItem('token')})
    }

    render() {
        return(
            <div className="works__wrap">
                <WorksList works={this.props.tasks.allTask}/>
            </div>
        )
    }
}

export default connect(mapStateProps, mapDispatchToProps)(Tasks);
