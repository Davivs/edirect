import React, { Component } from 'react';
import Project from "./components/project";

export default class Login extends Component {
    state = {
        projects : [],
        project : ''
    };

    componentDidMount() {
        this.projectList();
    }

    projectList() {
        fetch('http://localhost:3001/project/retrieve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({jwt : localStorage.getItem('jwt')})
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                const error = new Error(res.error);
                throw error;
            }
        }).then(data  => {
            this.setState({projects : data });
        }).catch(err => {
            alert('Error Retrieving projects');
        });
    }

    createProject = (event) => {
        if (this.state.project !== '') {
            event.preventDefault();
            fetch('http://localhost:3001/project/create', {
                method: 'POST',
                body: JSON.stringify({projectName: this.state.project, userId : this.props.userId, jwt : localStorage.getItem('jwt')}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.setState({project: ''});
                    this.projectList();
                    return;
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            }).catch(err => {
                console.error(err);
                alert('Error logging in please try again');
            });
        }
        else {
            alert('Make sure to give a name to your project');
        }
    };

    logout = () => {
        localStorage.setItem('jwt', '');
        this.props.history.push('/')
    };

    render() {
        return (
            <div>
                <header className="dashboardHeader">
                    {localStorage.getItem("username")}
                    <input onClick={this.logout} className="projectIcons btn-danger projectInput btn-sm" type="submit" value="Logout"/>
                </header>
                <div className="row">
                    <div className="createProject col-md-3 col-xs-12">
                        <input
                            className="projectInput"
                            type="string"
                            name="project"
                            placeholder="Create new project"
                            value={this.state.project}
                            onChange={event => this.setState({project : event.target.value})}
                            required
                        />
                        <input onClick={this.createProject} className="projectIcons btn-primary projectInput" type="submit" value="Add"/>
                    </div>
                </div>
                <div className="row">
                        { this.state.projects.map(project => <Project key={project._id} parentThis={this} projectId={project._id} projectName={project.projectName} /> ) }
                </div>
            </div>
        );
    }
}