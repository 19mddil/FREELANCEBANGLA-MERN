import axios from 'axios';
import { API } from '../utils/config';

export const register = user => {
    return axios.post(`${API}/user/signup`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const login = user => {
    console.log("here");
    console.log(`${API}/user/signin`);
    return axios.post(`${API}/user/signin`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const sendEmail = (token, code) => {
    return axios.post(`${API}/user/send/email`, code, {
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
        }
    })
}

export const verifyUser = (token, email) => {
    return axios.put(`${API}/user/email/verify`, email, {
        headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
        }
    })
}
