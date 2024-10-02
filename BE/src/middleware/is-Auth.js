const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Access Authorization header
    if(!authHeader) {
        const error = new Error('Unauthenticated');
        error.statusCode = 500;
        return res.status(400).send({
            statusCode: 400,
            msg: 'AuthHeader required',
            data: null
        })
    }
    const token = authHeader.split(' ')[1];
    let decodedToken ;
    try {    
        decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    } catch (err) {
        err.statusCode = 500;
        return res.status(400).send({
            statusCode: 400,
            msg: 'Unauthenticated',
            data: null
        })
    }
    if(!decodedToken) {
        const error = new Error('Unauthenticated');
        error.statusCode = 500;
        return res.status(400).send({
            statusCode: 400,
            msg: 'Unauthenticated',
            data: null
        })
    }
    req.userId = decodedToken.userId;
    next();
}
