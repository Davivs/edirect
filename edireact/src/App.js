import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import verifyAuth from "./verifyAuth";

class App extends Component {
    render() {
        return (
            <div className="ui container">
                <BrowserRouter>
                    <div>
                        <Route path="/" exact component={Login} />
                        <Route path="/dashboard" exact component={verifyAuth(Dashboard)} />
                        <Route path="/register" exact component={Register} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;