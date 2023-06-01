import React, { Component } from 'react';
import Layout from '../Layout';
import { showError, showLoading } from '../../utils/messages';
import { login } from '../../api/apiAuth';
import { Navigate } from "react-router";
import { authenticate } from '../../utils/auth';

class Login extends Component {
    state = {
        email: '',
        password: '',
        role: '',
        error: false,
        loading: false,
        disabled: false,
        redirect: false,
        success: false

    }
    handleChange = e => {
        this.setState({
            error: false,
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            error: false,
            loading: true,
            disabled: true
        });

        //this is a axios function
        let email = this.state.email;
        let password = this.state.password;
        let role = this.state.role;
        console.log(email, password, role);
        login({
            email,
            password,
            role
        }).then(response => {
            console.log("no err");
            authenticate(response.data.token, () => {
                this.setState({
                    email: '',
                    password: '',
                    role: '',
                    success: true,
                    disabled: false,
                    loading: false,
                    redirect: true,
                    error: false
                })
            })
        }).catch(err => {
            console.log("here");
            let errMsg = 'Something went wrong';
            if (err.response) {
                errMsg = err.response.data;
            }
            this.setState({
                error: errMsg,
                disabled: false,
                loading: false
            })
        })
    }
    redirectUser = () => {
        if (this.state.redirect) {
            return (<Navigate to='/' />)
        }
    }

    signInForm = () => (
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Email:</label>
                <input name='email' type="email" className="form-control"
                    value={this.state.email} required onChange={this.handleChange} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password:</label>
                <input name="password" type="password" className="form-control"
                    value={this.state.password} required onChange={this.handleChange} />
            </div>
            <div className='form-group'>
                <label className="text-muted">Log in as:</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" name="role" type="radio" value='worker' required onClick={this.handleChange} />
                <label className="form-check-label">
                    I am a worker.
                </label><br />
                <input className="form-check-input" name="role" type="radio" value='client' required onClick={this.handleChange} />
                <label className="form-check-label" >
                    I am a client.
                </label>
            </div>
            <button type="submit" className="btn btn-outline-primary" disabled={this.state.disabled}>Login</button>
        </form>
    );

    render() {
        return (
            <Layout title="Login" className="container col-md-8 offset-md-2">
                {this.redirectUser()}
                {showLoading(this.state.loading)}
                {showError(this.state.error, this.state.error)}
                <h3>Login Here,</h3>
                <hr />
                {this.signInForm()}
                <hr />
            </Layout>
        );
    }
}

export default Login;