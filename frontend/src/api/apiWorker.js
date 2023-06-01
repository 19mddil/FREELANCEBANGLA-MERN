import { API } from "../utils/config";
import axios from 'axios';

export const loadAllJobAdvertise = (token) => {
    return axios.get(`${API}/user/worker/job/advertisement`, {
        headers: {
            'Authorization': `${token}` //it will go to authorize middle ware check and destructed to user from token which will later be used to check whether the user is admin or not.
        }
    })
}

export const loadAllAppliedJobs = (token, applicant_id) => {
    return axios.get(`${API}/user/worker/job/application/all/${applicant_id}`, {
        headers: {
            'Authorization': `${token}`
        }
    })
}

export const confirmApplication = (token, data) => {
    return axios.post(`${API}/user/worker/job/application/confirm`, data, {
        headers: {
            'Authorization': `${token}`, //it will go to authorize middle ware check and destructed to user from token which will later be used to check whether the user is admin or not.
            'Content-Type': 'application/json'
        }
    });
}

export const getJobAdvertiseDetails = (token, id) => {
    return axios.get(`${API}/user/worker/job/advertisement/${id}`, {
        headers: {
            'Authorization': `${token}`
        }
    });
}