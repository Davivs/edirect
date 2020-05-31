import React, { Component } from 'react';
import Task from './task';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

class Project extends Component {
    state = {
        tasks: [],
        task: ''
    };

    componentDidMount() {
        this.taskList();
    }

    taskList() {
        fetch('http://localhost:3001/task/retrieve/'+this.props.projectId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                const error = new Error(res.error);
                throw error;
            }
        }).then(data  => {
            this.setState({tasks : data });
            return;
        }).catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
    }

    handleClick = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/task/create', {
            method: 'POST',
            body: JSON.stringify({checked : 0, taskName : this.state.task, projectId : this.props.projectId}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                this.setState({task : ''});
                this.taskList();
                return;
            } else {
                const error = new Error(res.error);
                throw error;
            }
        }).catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
    };

    changeProjectName = (event) => {
        event.preventDefault();
        let newProjectName = prompt("Please enter new project name", "");
        if (newProjectName !== '') {
            fetch('http://localhost:3001/project/changeName/' + this.props.projectId, {
                method: 'PUT',
                body: JSON.stringify({projectName: newProjectName}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if (res.status === 200) {
                    this.props.parentThis.projectList();
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
    };

    deleteProject = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/project/delete/' + this.props.projectId, {
            method: 'DELETE',
            body: JSON.stringify({checked : 0, taskName : this.state.task, projectId : this.props.projectId}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                this.props.parentThis.projectList();
                return;
            } else {
                const error = new Error(res.error);
                throw error;
            }
        }).catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
    };

    render() {
        return (
            <div className="col-md-4 col-xs-12">
                <div className="project">
                    <header className="projectHeader">{this.props.projectName}
                        <span className="projectIcons">
                            <span className="projectButtons" onClick={this.changeProjectName}> <EditIcon/></span>
                            <span className="projectButtons" onClick={this.deleteProject}> <DeleteForeverIcon /> </span>
                        </span>
                    </header>
                    <div className="projectContent">
                        <h4>To Do</h4>
                        { this.state.tasks.map(task => !task.checked ? <Task key={task._id} time={task.createdTime} parentThis={this} taskId={task._id} checked={task.checked} taskName={task.taskName} /> : null)}
                        <h4>Done</h4>
                        { this.state.tasks.map(task => task.checked ? <Task key={task._id} time={task.doneTime} parentThis={this} taskId={task._id} checked={task.checked} taskName={task.taskName} /> : null)}
                        <footer>
                            <input
                                type="string"
                                name="task"
                                placeholder="Task"
                                value={this.state.task}
                                onChange={event => this.setState({task : event.target.value})}
                                required
                            />
                            <input onClick={this.handleClick} className="projectIcons" type="submit" value="Add"/>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }



    isChecked(task)
    {
        if (task.checked === 1)
            return null;
        return <Task key={task.id} checked={task.checked} />
    };

    handleChange(evt) {
        this.setState({ checkboxChecked: evt.target.checked });
    }

    handleIsItChecked() {
        console.log(this.state.checkboxChecked ? 'Yes' : 'No');
    }

    handleToggle() {
        this.setState({ checkboxChecked: !this.state.checkboxChecked });
    }
}

export default Project;