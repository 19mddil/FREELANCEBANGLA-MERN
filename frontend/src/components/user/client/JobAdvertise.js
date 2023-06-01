import React from "react";
import { Component } from "react";
import TagsInput from "./TagsInput";
import Layout from "../../Layout";
import { showError, showSuccess, showLoading } from '../../../utils/messages';
import { userInfo } from '../../../utils/auth';
import { createJobAdvertise } from "../../../api/apiClient";

class JobAdvertise extends Component {
    state = {
        title: '',
        tags: [],
        startingDate: '',
        applicationEndingTime: '',
        formData: null,
        loading: false,
        disabled: false,
        success: false,
        error: false
    }

    componentDidMount() {
        this.setState({
            formData: new FormData()
        })
    }

    handleKeyDown = e => {
        if (e.key !== 'Enter') return;
        const value = e.target.value;
        if (!value.trim()) return;
        this.setState({
            tags: [...this.state.tags, value]
        })
        e.target.value = '';
        e.preventDefault();
    }

    removeTag = index => {
        this.setState({
            tags: this.state.tags.filter((el, i) => i !== index),
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            ...this.state,
            error: false,
            loading: true,
            disabled: true,
            success: false,

        });
        this.state.formData.set('tags', [...this.state.tags]);
        const { token } = userInfo();

        console.log(this.state.formData);
        console.log(token);

        createJobAdvertise(token, this.state.formData)
            .then(res => {
                this.setState({
                    title: '',
                    tags: [],
                    startingDate: '',
                    applicationEndingTime: '',
                    formData: new FormData(),
                    loading: false,
                    disabled: false,
                    success: true,
                    error: false
                })
            })
            .catch(err => {
                let errMsg = "Something went wrong";
                if (err.response) errMsg = err.response.data;
                this.setState({
                    title: '',
                    tags: [],
                    startingDate: '',
                    applicationEndingTime: '',
                    formData: null,
                    loading: false,
                    disabled: false,
                    success: false,
                    error: errMsg
                })
            });

    }

    handleChange = e => {
        const value = e.target.value;
        this.state.formData.set(e.target.name, value);
        this.setState({
            ...this.state,
            [e.target.name]: value,
            error: false,
            success: false
        })
    }

    productForm = () => (
        <form className="mb-3" onSubmit={this.handleSubmit}>
            <div className="form-group">
                <h4>Title: </h4>
                <input
                    name="title"
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    value={this.state.title}
                    disabled={this.state.disabled}
                    required
                />
            </div>
            <br />
            <div className="form-group">
                <h4 >Enter job skill-requirement tags:</h4>
                <TagsInput
                    tags={this.state.tags}
                    handleKeyDown={this.handleKeyDown}
                    removeTag={this.removeTag}
                    disabled={this.state.disabled}
                />
            </div>
            <br />

            <div className="form-group">
                <h4>Application DeadLine Date: </h4>
                <input
                    name="applicationEndingTime"
                    onChange={this.handleChange}
                    type="Date"
                    className="form-control"
                    value={this.state.applicationEndingTime}
                    disabled={this.state.disabled}
                    required
                />
            </div>
            <br />
            <div className="form-group">
                <h4>Job Starting Date: </h4>
                <input
                    name="startingDate"
                    onChange={this.handleChange}
                    type="Date"
                    className="form-control"
                    value={this.state.startingDate}
                    disabled={this.state.disabled}
                    required
                />
            </div>
            <br />
            <button className="btn btn-outline-primary" type="submit" disabled={this.state.disabled}>Post Job Advertise</button>
        </form>
    )

    render() {
        return (
            <Layout title="Create New Job" className="container col-md-8 offset-md-2">
                <div>

                    {showError(this.state.error, this.state.error)}
                    {showLoading(this.state.loading)}
                    {showSuccess(this.state.success, 'Jobs beed Advertised Successfully!')}
                    {this.productForm()}
                </div>
            </Layout>
        )
    }
}

export default JobAdvertise;