import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Home from './home/Home';
import Login from './user/Login';
import Register from './user/Register';
import { isAuthenticated } from '../utils/auth';
import WorkerDeals from './user/worker/Deals';
import WorkerApplications from './user/worker/WorkerApplications';
import ClientDeals from './user/client/Deals';
import Dashboard from './user/Dashboard';
import JobAdvertise from './user/client/JobAdvertise';
import LoadAdvertisedJobs from './user/client/LoadAdvertisedJobs';
import LoadJobApplicantsByJobId from './user/client/LoadJobApplicantsByJobId';

import Application from './user/worker/Application';

class Main extends Component {
    state = {
        auth: false,
    }
    useAuth = () => {
        this.setState({
            auth: isAuthenticated()
        });
    }
    render() {
        this.useAuth();
        return (
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={this.state.auth || isAuthenticated() ? (<Home />) : (<Login />)} />
                <Route path='/register' element={this.state.auth || isAuthenticated() ? (<Home />) : (<Register />)} />
                <Route path='/logout' element={<Navigate to='/Login' />} />
                <Route
                    path='/user/dashboard'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <Dashboard />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route
                    path='/worker/deals'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <WorkerDeals />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route
                    path='/worker/applications'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <WorkerApplications />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route
                    path='/client/deals'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <ClientDeals />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route
                    path='/client/advertise/job/new'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <JobAdvertise />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route
                    path='/client/jobs/advertised'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <LoadAdvertisedJobs />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route
                    path='/worker/jobs/apply/:job_id'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <Application />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route
                    path='/client/jobs/application/:job_id'
                    element={
                        this.state.auth || isAuthenticated() ? (
                            <LoadJobApplicantsByJobId />
                        ) : (
                            <Navigate
                                to="/login"
                            />
                        )
                    }
                />
                <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
        );
    }
}

export default Main;