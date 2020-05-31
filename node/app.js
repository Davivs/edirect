const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost/edirect';
const cookieParser = require('cookie-parser');

mongoose.connect(mongo_uri, function(err) {
   if (err) {
      throw err;
   } else {
      console.log(`Successfully connected to ${mongo_uri}`);
   }
});
app.use(cors());

const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');
const taskRouter = require('./routes/task');

app.use(cookieParser());

app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/task', taskRouter);

app.get('/', function (req, res){
   res.send("Hello world");
});

app.listen(port);