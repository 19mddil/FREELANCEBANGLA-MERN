import React from 'react';
import { useState } from 'react';
import Layout from '../Layout';
import { showError, showLoading } from '../../utils/messages';
import { register } from '../../api/apiAuth';
import { Link } from 'react-router-dom';

const Register = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        role: '',
        error: false,
        loading: false,
        disabled: false,
        success: false
    });

    const { email, password, role, success, error, loading, disabled } = values;

    const handleChange = e => {
        setValues({
            ...values,
            error: false,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true
        });
        console.log(email, password, role);
        //this is a axios function
        register({
            email,
            password,
            role
        }).then(response => {
            setValues({
                email: '',
                password: '',
                role: '',
                success: true,
                disabled: false,
                loading: false
            })
        }).catch(err => {
            let errMsg = 'Something went wrong';
            if (err.response) {
                errMsg = err.response.data;
            }
            setValues({
                ...values,
                success: false,
                error: errMsg,
                disabled: false,
                loading: false
            })
        })
    }

    const signUpForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input type="email" name="email" className="form-control"
                    value={email} required onChange={handleChange} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input type="password" name="password" className="form-control"
                    value={password} required onChange={handleChange} />
            </div>
            <div className="form-check">
                <input className="form-check-input" name="role" type="radio" value='worker' required onClick={handleChange} />
                <label className="form-check-label">
                    I want to register as a woker.
                </label><br />
                <input className="form-check-input" name="role" type="radio" value='client' required onClick={handleChange} />
                <label className="form-check-label" >
                    I want to register as a client.
                </label>
            </div>
            <button type="submit" className="btn btn-primary" disabled={disabled}>Create Account</button>
        </form>
    );

    const showSuccess = () => {
        if (success) return (
            <div className='alert alert-primary'>
                New account Created. Please <Link to='/login'>Login</Link>
            </div>
        )
    }

    return (
        <Layout title="Register" className="container col-md-8 offset-md-2">

            <h3>Register Here,</h3>
            <hr />
            {signUpForm()}
            <hr />
            {showSuccess(success)}
            {showLoading(loading)}
            {showError(error, error)}
        </Layout>
    );
}

export default Register;