// Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    checked: { type: Number, required: true },
    taskName : { type : String },
    projectId : { type : String},
    createdTime : { type : Date, default : Date.now },
    doneTime : { type : Date }
});

module.exports = mongoose.model('Task', TaskSchema);