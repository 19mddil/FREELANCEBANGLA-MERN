import React from "react";
import { useEffect, useState } from 'react';
import Layout from "../../Layout";
import { userInfo } from "../../../utils/auth";
import { loadAllAppliedJobs } from "../../../api/apiWorker";
import AppliedJobCard from "./AppliedJobCard";

const WorkerApplications = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        const { token, id } = userInfo();
        loadAllAppliedJobs(token, id)
            .then(res => {
                setAppliedJobs(res.data);
            })
            .catch(err => {

            });
    }, []);

    return (
        <div>
            <Layout title="Job Applicants" className="container">
                <div className="card-group">
                    {appliedJobs && appliedJobs.map(appliedJob => <AppliedJobCard job={appliedJob} key={appliedJob.id} />)}
                </div>
            </Layout>
        </div>
    )
}

export default WorkerApplications;