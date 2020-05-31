import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login : '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };
    onSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/user/register', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                return;
            } else {
                const error = new Error("User might be already taken");
                throw error;
            }
        }).then(data  => {
            this.props.history.push('/');
        }).catch(err => {
            console.error(err);
            alert(err);
        });
    };

    render() {
        return (
            <div className="loginPage">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="col-12">
                            <h1>Register</h1>
                        </div>
                        <div className="col-12">
                            <input
                                type="string"
                                name="login"
                                placeholder="Enter login"
                                value={this.state.login}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-12">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-12">
                            <input className="btn btn-primary" type="submit" value="Submit"/>
                        </div>
                    </form>
                    <div className="col-12">
                        <Link to="/">Back to login</Link>
                    </div>
                </div>
            </div>
        );
    }
}
