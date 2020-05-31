// Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName : { type : String },
    username : { type : String }
});

module.exports = mongoose.model('Project', ProjectSchema);