var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Project = require('../models/project');
const verifyAuth = require('../middleware/verifyAuth');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.post('/retrieve/', verifyAuth, async function(req, res, next) {
    Project.find({username : req.login}, function (err, projects){
        res.status(200).json(projects);
    });
});

router.post('/create', verifyAuth, async function(req, res, next) {
    const { projectName } = req.body;
    const project = new Project({ projectName, username: req.login });
    project.save(function(err) {
        if (err) {
            res.status(500).send("Error registering new project please try again.");
        } else {
            res.status(200).send("New project added!");
        }
    });
});

router.put('/changeName/:id', async function(req, res, next) {
    const update = { projectName: req.body.projectName };
    let newName = await Project.findOneAndUpdate({_id : req.params.id}, update, {new: true});

    res.status(200).send("Ok");
});


router.delete('/delete/:projectId', async function(req, res, next) {
    let deleteTask = await Project.deleteOne({_id : req.params.projectId}, {new: true});
    res.status(200).send("Ok");
});



module.exports = router;