const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config/config');


function checkJwt(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('No token provided');

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send('Invalid token');
    }
}

module.exports = { checkJwt };