import React, { Component } from 'react';
import Checkbox from 'react-bootstrap/FormCheck';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import moment from 'moment';

class Task extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleIsItChecked = this.handleIsItChecked.bind(this);
    }

    render() {
        return (
            <div className="row">
                <div className="col-10">
                    <Checkbox title={moment(new Date(this.props.time)).format("YYYY-MM-DD HH:mm:ss")} label={this.props.taskName} checked={this.props.checked} onChange={this.handleChange} />
                </div>
                <div className="col-2">
                    {!this.props.checked && <DeleteForeverIcon onClick={this.deleteTask}/>}
                </div>
            </div>
        );
    }

    deleteTask = (event) => {
        fetch('http://localhost:3001/task/delete/' + this.props.taskId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                this.props.parentThis.taskList();
                return;
            } else {
                const error = new Error(res.error);
                throw error;
            }
        }).catch(err => {
            alert('Error erasing task');
        });
    };

    handleChange(evt) {
        //this.setState({ checkboxChecked: evt.target.checked });
        fetch('http://localhost:3001/task/status/'+this.props.taskId, {
            method: 'PUT',
            body: JSON.stringify({checked : evt.target.checked }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                this.props.parentThis.taskList();
                return;
            } else {
                const error = new Error(res.error);
                throw error;
            }
        }).catch(err => {
            console.error(err);
            alert('Error handling checked');
        });
    }

    handleIsItChecked() {
        console.log(this.state.checkboxChecked ? 'Yes' : 'No');
    }

}

export default Task;