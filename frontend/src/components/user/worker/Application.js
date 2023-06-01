import React from "react";
import { useEffect, useState } from 'react';
import { confirmApplication } from "../../../api/apiWorker";
import { userInfo } from "../../../utils/auth";
import Layout from "../../Layout";
import { useParams } from 'react-router-dom';
import { showSuccess, showError, showLoading } from '../../../utils/messages';
import ApplicationModal from "./ApplicationModal";
import { getJobAdvertiseDetails } from "../../../api/apiWorker";

const Application = () => {

    const { job_id } = useParams();
    const [userId, setUserId] = useState('');
    const [job, setJob] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        const { token, id } = userInfo();
        setToken(token);
        setUserId(id);
        getJobAdvertiseDetails(token, job_id)
            .then(res => {
                setJob(res.data);
            })
            .catch(err => setError("Failed to load the advertised job"))
    }, []);

    const handleClick = () => {
        setLoading(true);
        confirmApplication(token, { job_id: job.id, applicant_id: userId })
            .then(res => {
                setSuccess(true);
                setLoading(false);
                toggle();
            })
            .catch(err => {
                console.log("here");
                setSuccess(false);
                setLoading(false);
                setError(err.message);
                toggle();
            })
    }

    return (
        <div>
            <Layout title="Apply Job" className="container">
                <div style={{ width: '100%' }}>
                    {showLoading(loading)}
                    {showError(error, "You have already applied for this job")}
                    {showSuccess(success, "You have applied for the job")}
                </div>
                <ApplicationModal job={job} toggle={toggle} modal={modal} handleClick={handleClick} />
            </Layout>
        </div>
    )
}

export default Application;