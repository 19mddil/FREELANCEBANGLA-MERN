import React from 'react';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { userInfo } from '../../utils/auth';

const Dashboard = () => {
    const { email, role } = userInfo();
    const UserLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">{role} links</h4>
                <ul className="list-group">
                    {
                        role === 'worker'
                        &&
                        (
                            <>
                                <li className="list-group-item">
                                    <Link to="/worker/deals" className="nav-link">Current Jobs</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/worker/applications" className="nav-link">My Applications</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link to="/" className="nav-link">Apply for a job now</Link>
                                </li>
                            </>
                        )
                    }
                    {
                        role === 'client'
                        &&
                        (
                            <>
                                <li className="list-group-item">
                                    <Link className="nav-link" to="/client/deals">Ongoing Created Jobs</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link className="nav-link" to="/client/jobs/advertised">View my Advertised Jobs</Link>
                                </li>
                                <li className="list-group-item">
                                    <Link className="nav-link" to="/client/advertise/job/new">Advertise a new Job</Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
        )
    };

    const UserInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">{role} information</h3>
            <ul className="list-group">
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role}</li>

                <li className="list-group-item" style={{ textAlign: "right" }}>
                    <Link className="nav-link" to="#">Update Profile</Link>
                </li>
            </ul>
        </div>
    );

    return (
        <Layout title="Dashboard" className="container-fluid">
            <div className="row">
                <div className="col-sm-3">
                    {UserLinks()}
                </div>
                <div className="col-sm-9">
                    {UserInfo()}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;