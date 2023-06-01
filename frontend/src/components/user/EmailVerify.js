import React, { Component } from 'react';
import Layout from '../Layout';
import { showError, showLoading, showEmailSent, showEmailNotSent } from '../../utils/messages';
import { userInfo } from '../../utils/auth';
import { emailVerify } from '../../api/apiAuth';
import { Navigate } from 'react-router';

class EmailVerify extends Component {
    state = {
        code: '',
        inputCode: '',
        error: false,
        loading: false,
        disabled: false,
        redirect: false,
        success: false,
        emailSuccess: false,
        emailNotSuccess: false,
    }

    componentDidMount() {
        this.setState({
            loading: true,
            code: Math.floor(100000 + Math.random() * 900000),
        })
        const { token, email } = userInfo();
        emailVerify(token, { code: this.state.code, email: email })
            .then(res => {
                this.setState({
                    emailSuccess: true,
                    loading: false,
                    disabled: false,
                })
            })
            .catch(err => {
                this.setState({
                    emailNotSuccess: true,
                    disabled: true,
                    loading: false
                })
            });

    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            error: false,
            loading: true,
            disabled: true,
        });
        //check whether the email code and the input code is the same
        //the go back to back end and save varified true for this user
        //them comeback with a new token in response and delete the old one and set it again.
    }
    redirectUser = () => {
        if (this.state.emailNotSuccess) {
            return (<Navigate to='/' />)
        }
    }
    verificationForm = () => {
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label className='text-muted'>Enter Six Digit Code:</label>
                <input name='inputCode' type='number' className='form-control' value={this.state.inputCode} required onChange={this.handleChange} disabled={this.state.disabled} />
            </div>
            <button type="submit" className='btn btn-outline-primary' disabled={this.state.disabled}>Verify</button>
        </form>
    }
    render() {
        return (
            <Layout title="Email Verification" className="container col-md-8 offset-md-2">

                {showEmailNotSent(this.state.emailNotSuccess, "Email couldn't be sent")}
                {this.redirectUser()}
                {showEmailSent(this.state.emailSuccess, "An Email has been sent")}
                {showLoading(this.state.loading)}
                {showError(this.state.error, this.state.error)}
                <h3>Verify Here,</h3>
                <hr />
                {this.signInForm()}
                <hr />
            </Layout>
        );
    }
}

export default EmailVerify;