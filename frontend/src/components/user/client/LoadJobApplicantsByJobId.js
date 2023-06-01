import React from "react";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userInfo } from "../../../utils/auth";
import { loadJobApplicantsByJobId, selectWorkersApplication, rejectWorkerApplication } from "../../../api/apiClient";
import Layout from "../../Layout";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { showLoading, showSuccess, showError } from "../../../utils/messages";

const LoadJobApplicantsByJobId = () => {
    const { job_id } = useParams();
    const [tkn, setTkn] = useState('');
    const [workerId, setWorkerId] = useState('');
    const [resData, setResData] = useState(null);
    const [rejected, setRejected] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');



    useEffect(() => {
        const { token, id } = userInfo();
        setWorkerId(id);
        setTkn(token);
        loadJobApplicantsByJobId(token, job_id, id)
            .then(res => {
                console.log(res.data);
                setResData(res.data);
            })
            .catch(err => { })
    }, []);

    const handleSelect = async (applicationId) => {

        const { token, id } = userInfo();
        setLoading(true);
        setSuccess(false);
        try {
            await selectWorkersApplication(tkn, {
                selected_application_id: applicationId,
            })
            const res = await loadJobApplicantsByJobId(token, job_id, id);
            setResData(res.data);
            setLoading(false);
            setSuccess(true);
        } catch (err) {
            setError("Couldn't do that");
        }


    }

    const handleReject = async (applicationId) => {
        const { token, id } = userInfo();
        setLoading(true);
        setSuccess(false);
        try {
            await rejectWorkerApplication(tkn, {
                rejected_application_id: applicationId,
            })
            const res = await loadJobApplicantsByJobId(token, job_id, id);
            setResData(res.data);
            setLoading(false);
            setSuccess(true);
        } catch (err) {
            setError("Couldn't do that");
        }

    }
    return (
        <div>
            <Layout title="Job Applicants" className="container">
                <h5>Select,Reject, if selected insert to a new Table</h5>
                <div style={{ width: '100%' }}>
                    {showLoading(loading)}
                    {showError(error, "You have already applied for this job")}
                    {showSuccess(success, "It is done")}
                </div>
                <ListGroup>
                    {resData && resData.map(data =>
                    (<ListGroupItem>
                        <Link>{data.email}</Link>
                        <Button
                            color="danger" size="sm" style={{ margin: "1%", float: "right" }}
                            disabled={data.selected === 'false' && data.rejected === 'false' ? false : (data.selected === 'true' && data.rejected === 'false' ? false : true)}
                            onClick={() => handleReject(data.application_id)}>

                            {data.rejected === 'true' && data.selected === 'false' ? 'Rejected' : 'Reject'}

                        </Button>
                        <Button
                            onClick={() => handleSelect(data.application_id)}
                            disabled={data.selected === 'false' && data.rejected === 'false' ? false : (data.rejected === 'true' && data.selected === 'false' ? false : true)}
                            color="success" size="sm" style={{ margin: "1%", float: "right" }} >

                            {data.selected === 'true' && data.rejected === 'false' ? 'Selected' : 'Select'}

                        </Button>
                    </ListGroupItem>)
                    )}
                </ListGroup>
            </Layout>
        </div>
    )
}

export default LoadJobApplicantsByJobId;