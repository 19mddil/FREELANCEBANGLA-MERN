import React from "react";
import { Component } from "react";
import { isAuthenticated, userInfo } from '../../utils/auth';
import Layout from "../Layout";
import LoadJobs from "../user/worker/LoadJobs";
import LoadWorkers from '../user/client/LoadWorkers';
// ayer utsho akhn desher website ah
class Home extends Component {
    render() {
        return (
            <div>
                {
                    isAuthenticated()
                    &&
                    <Layout title='Home Page' className='container' >

                        <div className='row'>
                            <p>Hi, {userInfo().role} user, email: {userInfo().email}</p>
                            {userInfo().role === 'worker' && (<LoadJobs />)}
                            {userInfo().role === 'client' && (<LoadWorkers />)}
                        </div>
                    </Layout>
                }
                {
                    !isAuthenticated()
                    &&
                    <Layout title='Home Page' className='container' >
                        <p>Hi, guest user</p>
                    </Layout>
                }
            </div>
        )
    }
}

export default Home;