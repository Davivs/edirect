var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Task = require('../models/task');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/retrieve/:id', async function(req, res, next) {
   Task.find({projectId : req.params.id}, function (err, tasks){
       res.status(200).json(tasks);
   });
});

router.post('/create', async function(req, res, next) {

    const { checked, taskName, projectId } = req.body;
    const task = new Task({ checked, taskName, projectId });
    task.save(function(err) {
        if (err) {
            res.status(500).send("Error registering new task please try again.");
        } else {
            res.status(200).send("New task added!");
        }
    });
});

router.put('/status/:id', async function(req, res, next) {

    const update = { checked: req.body.checked, doneTime : Date.now() };
    let newTask = await Task.findOneAndUpdate({_id : req.params.id}, update, {new: true});

    res.status(200).send("Ok");
});

router.delete('/delete/:id', async function(req, res, next) {
    let deleteTask = await Task.deleteOne({_id : req.params.id}, {new: true});
    res.status(200).send("Ok");
});



module.exports = router;