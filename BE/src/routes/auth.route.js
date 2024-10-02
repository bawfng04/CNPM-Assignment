const express = require('express');
const router = express.Router();
const {body, param} = require('express-validator');
const { v4: uuidv4} = require('uuid');
const isAuth = require('../middleware/is-Auth');
const authController = require('../controllers/auth.Controller');

// [POST] /signUp
router.post('/signUp', [
    body('email')
        .trim()
        .isEmail(),
    body('password')
        .trim()
        .isLength({min: 5})
        .withMessage('Password mus be at leat 5 characters long')
] ,authController.postSignUp);


router.post('/login', [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email format')
        .custom((value) => {
            if(!value.endsWith('@hcmut.edu.vn')) {
                throw new Error('Invaled email')
            }
            return true;
        }),
    body('password')
        .trim()
        .isLength({min: 5})
        .withMessage('Password mus be at leat 5 characters long')
], authController.postLogin);

router.get('/users', isAuth, authController.fetchAllUsers);

router.get('/', (req, res, next) => {
    res.send("Hello World");
})

module.exports = router;