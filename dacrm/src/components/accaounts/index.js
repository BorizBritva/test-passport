import React, {Fragment} from 'react';
import AdminHeader from './headnav';
import SideBar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './account.sass';

export default class Accounts extends React.Component {
    render() {
        return(
            <>
              <div className="container-fluid all__content">
                <div className="row all__content">
                <SideBar />
                <main className="main-content p-0 col-sm-12 col-md-9 col-lg-10">
                  <AdminHeader />
                </main>
                </div>
              </div>
            </>
        )
    }
}
