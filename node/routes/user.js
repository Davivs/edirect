const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const verifyAuth = require('../middleware/verifyAuth');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

const secret = 'edirect';

router.post('/register', async function(req, res, next) {
    const { login, password } = req.body;
    const user = new User({ login, password });
    console.log(user);

    user.save(function(err, user) {
        //console.log(err);
        if (err) {
            res.status(401).json(err);
        } else {
            res.status(200).send(user);
        }
    });

});

router.post('/login', async function(req, res, next) {
    const { login, password } = req.body;
    console.log(req.body);
    User.findOne({ login }, function(err, user) {
        if (err) {
            console.error(err);
            res.status(500).json({error: 'Internal error please try again'});
        }
        else if (!user) {
            res.status(401).json({   error: 'Incorrect email or password'});
        }
        else {
            user.isCorrectPassword(password, function(err, same)
            {
                if (err) {
                    res.status(500).json({error: 'Internal error please try again'});
                }
                else if (!same) {
                    res.status(401).json({error: 'Incorrect login or password'});
                }
                else {
                    // Issue token
                    const payload = { login };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    console.log({token : token, username:login});
                    res.status(200).json({token : token, username:login});
                }
            });
        }
    });
});

router.post('/checkToken', verifyAuth, function(req, res) {
    res.status(200).json({username:req.login});
});

module.exports = router;