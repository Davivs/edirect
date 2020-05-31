const jwt = require('jsonwebtoken');
const secret = 'edirect';

const verifyAuth = function(req, res, next)
{
    const token = req.body.jwt;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    }
    else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            }
            else {
                req.login = decoded.login;
                next();
            }
        });
    }
};


module.exports = verifyAuth;