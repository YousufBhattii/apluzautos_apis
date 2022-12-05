let mongoose = require('mongoose');
let express = require('express'); 
let router = express.Router();
const { check, validationResult } = require('express-validator');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let User = require('../Models/User');
const Helpers = require('../Helpers');
const { verifyToken } = require('../Helpers');

router.post('/register-user', [
    check('name', "Name field is required").not().isEmpty(),
    check('email', "Enter a valid email address").isEmail(),
    check('password', "Password length should be 8 to 16 characters").isLength({min:8, max:16}),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json(errors);
    }
    const name = req.body.name;
    const email = req.body.email;
    let password = req.body.password;
    const oldUser = await User.findOne({email});
    if(oldUser){
        return res.status(402).json({'message':'User already exists'});
    }else{
        password = await bcrypt.hash(password, 10);
        const request = {name, email, password};
        User.create(request, (error, data) => {
            if(error){
                return res.status(402).json({'error': error});
            }else{
                return res.json(data);
            }
        });
    }
});

router.post('/login-user', [
    check('email', 'Enter a valid email address').isEmail(),
    check('password', 'Enter a password to continue').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(402).json(errors);
    }
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign({user_id: user._id, email}, Helpers.tokenKey, {
            expiresIn: "2h",
        });
        let data = {
            user,
            token,
        };
        return res.status(200).json(data);
    }else{
        return res.status(402).json({'error': 'Invalid email or password'});
    }
});

router.get('/get-users', (req, res) => {
    if(verifyToken(req, res)){
        User.find((error, data) => {
            if(error){
                return res.status(402).json({'error': error});
            }else{
                return res.json(data);
            }
        });
    }else{
        return res.status(402).json({'error': 'Unauthenticated'});
    }
});

module.exports = router;