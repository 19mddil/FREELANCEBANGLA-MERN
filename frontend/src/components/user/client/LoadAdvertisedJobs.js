import React from "react";
import { Component } from "react";
import { loadAllJobAdvertiseforClientId } from "../../../api/apiClient";
import { userInfo } from "../../../utils/auth";
import Layout from "../../Layout";
import Card from "./Card";

class LoadAdvertisedJobs extends Component {
    state = {
        jobs: null
    }
    componentDidMount() {
        const { id, token } = userInfo();
        loadAllJobAdvertiseforClientId(token, id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    jobs: res.data
                })
                console.log(this.state.jobs);
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div>
                <Layout title="clients advertised jobs" className="container">
                    <div className="card-group">
                        {this.state.jobs && this.state.jobs.map(job => <Card job={job} key={job.id} />)}
                    </div>
                </Layout>
            </div>
        )
    }
}

export default LoadAdvertisedJobs;