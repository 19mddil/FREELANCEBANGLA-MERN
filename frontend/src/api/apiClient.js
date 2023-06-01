import { API } from "../utils/config";
import axios from 'axios';

export const createJobAdvertise = (token, data) => {
    return axios.post(`${API}/user/client/job/advertise/new`, data, {
        headers: {
            'Authorization': `${token}` //it will go to authorize middle ware check and destructed to user from token which will later be used to check whether the user is admin or not.
        }
    })
}
export const loadAllJobAdvertiseforClientId = (token, id) => {
    return axios.get(`${API}/user/client/job/view/all/advertised/${id}`, {
        headers: {
            'Authorization': `${token}` //it will go to authorize middle ware check and destructed to user from token which will later be used to check whether the user is admin or not.
        }
    })
}

export const loadJobApplicantsByJobId = (token, job_id, client_id) => {
    return axios.get(`${API}/user/client/job/view/all/applicants/${job_id}/${client_id}`, {
        headers: {
            'Authorization': `${token}` //it will go to authorize middle ware check and destructed to user from token which will later be used to check whether the user is admin or not.
        }
    });
}

export const selectWorkersApplication = (token, data) => { // data has selected_application_id
    return axios.post(`${API}/user/client/job/select/worker/application`, data, {
        headers: {
            'Authorization': `${token}` //it will go to authorize middle ware check and destructed to user from token which will later be used to check whether the user is admin or not.
        }
    })
}

export const rejectWorkerApplication = (token, data) => {
    return axios.post(`${API}/user/client/job/reject/worker/application`, data, { //data hase rejected_application_id
        headers: {
            'Authorization': `${token}` //it will go to authorize middle ware check and destructed to user from token which will later be used to check whether the user is admin or not.
        }
    })
}