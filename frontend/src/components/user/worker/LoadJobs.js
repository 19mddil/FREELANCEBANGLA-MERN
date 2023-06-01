import React from "react";
import { Component } from "react";
import { loadAllJobAdvertise } from "../../../api/apiWorker";
import { userInfo } from "../../../utils/auth";
import Card from "./Card";

class LoadJobs extends Component {
    state = {
        jobs: null
    }
    componentDidMount() {
        const { token } = userInfo();
        loadAllJobAdvertise(token)
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
            <div className="card-group">
                {this.state.jobs && this.state.jobs.map(job => <Card job={job} key={job.id} />)}
            </div>
        )
    }
}

export default LoadJobs;