let mongoose = require('mongoose');
let express = require('express'); 
let router = express.Router();
const { check, validationResult } = require('express-validator');

let Service = require('../Models/Service');
const { verifyToken } = require('../Helpers');

router.post('/add', [
    check('service_name', "Service name field is required").not().isEmpty(),
    check('price', "Enter valid price value").not().isEmpty().isNumeric(),
], async (req, res) => {
    if(verifyToken(req, res)){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(402).json(errors);
        }
        const service_name = req.body.service_name;
        const description = req.body.description;
        const price = req.body.price;
    
        const request = {service_name, description, price};
    
        Service.create(request, (error, data) => {
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

router.get('/', (req, res) => {
    if(verifyToken(req, res)){
        Service.find((error, data) => {
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
    check('service_name', "Service name field is required").not().isEmpty(),
    check('price', "Price field is required").not().isEmpty(),
], async (req, res) => {
    if(verifyToken(req, res)){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.json(errors);
        }
        const service_name = req.body.service_name;
        const description = req.body.description;
        const price = req.body.price;
    
        const request = {service_name, description, price};
    
        Service.findByIdAndUpdate(req.body._id, request, (error, data) => {
            if(error){
                return res.status(402).json({'error': error});
            }else{
                return res.status(200).json({message: 'Service updated successfully'});
            }
        });
    }else{
        return res.status(402).json({'error': 'Unauthenticated'});
    }
});

router.get('/delete/:id', (req, res) => {
    if(verifyToken(req, res)){
        Service.findByIdAndRemove(req.params.id, (error, data) => {
            if(error){
                return res.status(402).json({'error': error});
            }else{
                return res.status(200).json({message: 'Service deleted successfully'});
            }
        });
    }else{
        return res.status(402).json({'error': 'Unauthenticated'});
    }
});

module.exports = router;