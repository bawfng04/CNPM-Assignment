const {validationResult } = require('express-validator');
const {v4 : uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserService = require('../../database/userService');

class AuthController {
    async  postSignUp(req, res, next){
        const userId = uuidv4();
        const errors = validationResult(req);
        let role  = req.role;
        if(!role) {
            role = 'user'
        }
        if(!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 422;
            error.data = errors.array();
            return res.status(422).json({
                statusCode: 422,
                msg: error.message,
                data: error.data    
            })
        }
        const {email, password} = req.body;
        let username = req.body.username;
        if(!username) {
            username = email.split('@')[0];
        }
        console.log('Check email: ', email)
        const existUser = await UserService.findByEmail(email)
        if(existUser.data) {
            return res.status(403).json({
                statusCode: 403,
                msg: "This email had already exist",
                data: null
            })
        }

        bcrypt.hash(password, 12)
            .then((hashPw) => {
                return UserService.createUser(userId, username, hashPw, email);
            })
            .then(result => {
                if(result.status === 200){
                    return UserService.createStudent(userId)
                } else {
                    const err = new Error(result.msg);
                    next(err);
                }
            })
            .then(result => {
                if(result.status === 200){
                    return res.status(200).json({
                        statusCode: 200,
                        msg: "Create user sucessfully",
                        data: null
                    })
                } else {
                    const err = new Error(result.msg);
                    next(err);
                }
            })
            .catch(err => {
                if(!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            })
    }

    async postLogin(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        let loadedUser;
        UserService.findByEmail(email) 
            .then(result => {
                if(result.status !== 200) {
                    const error = new Error('Wrong email');
                    error.statusCode = 401;
                    throw err;
                }
                loadedUser = result.data;   
                return bcrypt.compare(password, loadedUser.password);
            })
            .then((isEqual) => {
                if(!isEqual) {
                    const error = new Error('Wrong password');
                    error.statusCode = 401;
                    throw error;
                }

                const token = jwt.sign(
                    {
                        email: loadedUser.email, 
                        userId: loadedUser.id,
                        role: loadedUser.role
                    },
                    process.env.SECRET_TOKEN,
                    { expiresIn: '1h'}
                );
                res.status(200).json({
                    token: token,
                })
            })
            .catch(err => {
                if(!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            })
    }

    async fetchAllUsers(req, res, next) {
        const limit = req.params.limit ? req.params.limit : 10;
        try {
            const result = await UserService.fetchUsers(limit);
            if(result.status !== 200) {
                statusCode: result.status, 
               { ... result}
            }
            res.status(200).json({
                statusCode: 200,
                msg: `Fetch users LIMI ${limit}`,
                data: result.data
            });
        }
        catch(err) {
            next(err);
        }
    }
}

module.exports = new AuthController;