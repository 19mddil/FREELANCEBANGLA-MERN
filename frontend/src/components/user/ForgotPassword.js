import React, { Component } from 'react';
import { sendEmailForForgottenPassword } from '../../api/apiAuth';
import Layout from '../Layout';
import { showEmailSent, showEmailNotSent, showLoading, showError } from '../../utils/messages';

class ForgotPassword extends Component {
    state = {
        code: '' + Math.floor(100000 + Math.random() * 900000),
        inputCode: '',
        email: '',
        disabledOne: 'false',
        role: '',
        roleDisabled: 'false',
        emailSuccess: false,
        emailNotSuccess: false,
        loading: false

    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEmailSubmit = e => {
        e.preventDefault();
        console.log(this.state.email);
        console.log(this.state.role);
        sendEmailForForgottenPassword({ code: this.state.code, email: this.state.email })
            .then(res => {

            })
            .catch(err => {

            })
    }
    render() {
        return (
            <Layout title="Forgot Password" className="container col-md-8 offset-md-2">
                {showEmailNotSent(this.state.emailNotSuccess, "Email couldn't be sent")}
                Enter your Registered Email and your role(Client/Worker)
                <hr />
                <form onSubmit={this.handleEmailSubmit} >
                    <div className="form-group">
                        <label className='text-muted'>Enter your email:</label>
                        <input name='email' type='email' className='form-control' value={this.state.email} required onChange={this.handleChange} disabled={this.state.disabledOne} />
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" name="role" type="radio" value='worker' required onClick={this.handleChange} disabled={this.state.disabledOne} />
                        <label className="form-check-label">
                            Set My Worker role password
                        </label><br />
                        <input className="form-check-input" name="role" type="radio" value='client' required onClick={this.handleChange} disabled={this.state.disabledOne} />
                        <label className="form-check-label" >
                            Set My Client role password
                        </label>
                    </div>
                    <button type="submit" className='btn btn-outline-primary' disabled={this.state.disabled}>Send Me Code</button>
                </form>
                <hr />
                <h3>Input the 6 digit Code sent to your Email</h3>
                <hr />
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label className='text-muted'>Enter Six Digit Code:</label>
                        <input name='inputCode' type='number' className='form-control' value={this.state.inputCode} required onChange={this.handleChange} disabled={this.state.disabled} />
                    </div>
                    <button type="submit" className='btn btn-outline-primary' disabled={this.state.disabled}>Verify</button>
                </form>
                <hr />
            </Layout>
        )
    }
}

export default ForgotPassword;