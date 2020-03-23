import React, {Fragment} from 'react';
import AdminHeader from './headnav';
import Tasks from './tasks/index';
import Home from './home/index';
import Profile from './profile/index';
import SideBar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './account.sass';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import changeSdb from '../../actions/sidebar';
import exit from '../../helpers/exit';

const mapStateProps = state => {
    return {
        sidebarType: state.sidebarType,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeSdb: bindActionCreators(changeSdb, dispatch),
    }
}

class Accounts extends React.Component {

    showComponent() {
        if (this.props.sidebarType == 'home') return <Home />;
        if (this.props.sidebarType == 'tasks') return <Tasks />;
        if (this.props.sidebarType == 'info') return <Profile />;
        return <Home />
    }

    render() {
        return(
            <>
              <div className="container-fluid all__content">
                <div className="row all__content">
                <SideBar homePage='home' taskPage='tasks' infoCard='info' changeComponent={this.props.changeSdb}/>
                <main className="main-content p-0 col-sm-12 col-md-9 col-lg-10">
                  <AdminHeader exit={exit}/>
                  {this.showComponent()}
                </main>
                </div>
              </div>
            </>
        )
    }
}

export default connect(mapStateProps, mapDispatchToProps)(Accounts);
