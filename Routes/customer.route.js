let mongoose = require('mongoose');
let express = require('express'); 
let router = express.Router();
const { check, validationResult } = require('express-validator');

let Customer = require('../Models/Customer');
const { verifyToken } = require('../Helpers');

router.post('/add', [
    check('name', "Customer name field is required").not().isEmpty(),
    check('email', "Customer email field is required").not().isEmpty(),
    check('phone', "Customer phone field is required").not().isEmpty(),
    check('address', "Customer address field is required").not().isEmpty(),
    check('tax', "Customer tax status is required").not().isEmpty(),
], async (req, res) => {
    if(verifyToken(req, res)){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(402).json(errors);
        }
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const tax = req.body.tax;
        const user_id = req.body.user_id;
    
        const request = {name, email, phone, address, tax, user_id};
    
        Customer.create(request, (error, data) => {
            if(error){
                return res.status(402).json({'error': error});
            }else{
                return res.status(200).json(data);
            }
        });
    }else{
        return res.status(402).json({'error': 'Unauthenticated'});
    }
});

router.get('/all/:user_id', (req, res) => {
    if(verifyToken(req, res)){
        Customer.find({'user_id':req.params.user_id},(error, data) => {
            if(error){
                return res.status(402).json({'error': error});
            }else{
                return res.status(200).json(data);
            }
        });
    }else{
        return res.status(402).json({'error': 'Unauthenticated'});
    }
});

router.post('/update', [
    check('name', "Customer name field is required").not().isEmpty(),
    check('email', "Customer email field is required").not().isEmpty(),
    check('phone', "Customer phone field is required").not().isEmpty(),
    check('address', "Customer address field is required").not().isEmpty(),
    check('tax', "Customer tax status is required").not().isEmpty(),
], async (req, res) => {
    if(verifyToken(req, res)){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.json(errors);
        }
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const tax = req.body.tax;
        const user_id = req.body.user_id;
        
        const request = {name, email, phone, address, tax, user_id};
    
        Customer.findByIdAndUpdate(req.body._id, request, (error, data) => {
            if(error){
                return res.status(402).json({'error': error});
            }else{
                return res.status(200).json({message: 'Customer updated successfully'});
            }
        });
    }else{
        return res.status(402).json({'error': 'Unauthenticated'});
    }
});

router.get('/delete/:id', (req, res) => {
    if(verifyToken(req, res)){
        Customer.findByIdAndRemove(req.params.id, (error, data) => {
            if(error){
                return res.status(402).json({'error': error});
            }else{
                return res.status(200).json({message: 'Customer deleted successfully'});
            }
        });
    }else{
        return res.status(402).json({'error': 'Unauthenticated'});
    }
});

module.exports = router;