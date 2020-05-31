import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
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
        fetch('http://localhost:3001/user/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res);
            if (res.status === 200) {

                return res.json();
            } else {
                const error = new Error(res.error);
                throw error;
            }
        }).then(data  => {
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('username', data.username);
            this.props.history.push('/Dashboard');
        }).catch(err => {
                console.error(err);
                alert('Error logging in please try again');
        });
    };

    render() {
        return (
            <div className="loginPage">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="col-12">
                            <h1>Login Below!</h1>
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
                        <Link to="/register">Create account</Link>
                    </div>
                </div>
            </div>
        );
    }
}
