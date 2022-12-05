let mongoose = require('mongoose');
let express = require('express'); 
let router = express.Router();
const { check, validationResult } = require('express-validator');

let Oil = require('../Models/Oil');
const { verifyToken } = require('../Helpers');

router.post('/add', [
    check('name', "Oil name field is required").not().isEmpty(),
    check('brand', "Brand name field is required").not().isEmpty(),
    check('type', "Oil Type field is required").not().isEmpty(),
    check('quantity', "Quantity must be at least 1").isLength({min:1}),
    check('pricePerQuartz', "Price Per Quartz field must be at least 1").isLength({min:1}),
    check('pricePerVehicle', "Price Per Quartz field must be at least 1").isLength({min:1}),
], async (req, res) => {
    if(verifyToken(req, res)){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(402).json(errors);
        }
        const name = req.body.name;
        const brand = req.body.brand;
        const type = req.body.type;
        const quantity = req.body.quantity;
        const pricePerQuartz = req.body.pricePerQuartz;
        const pricePerVehicle = req.body.pricePerVehicle;
    
        const request = {name, brand, type, quantity, pricePerQuartz, pricePerVehicle};
    
        Oil.create(request, (error, data) => {
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
        Oil.find((error, data) => {
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
    check('name', "Oil name field is required").not().isEmpty(),
    check('brand', "Brand name field is required").not().isEmpty(),
    check('type', "Oil Type field is required").not().isEmpty(),
    check('quantity', "Quantity must be at least 1").isLength({min:1}),
    check('pricePerQuartz', "Price Per Quartz field must be at least 1").isLength({min:1}),
    check('pricePerVehicle', "Price Per Quartz field must be at least 1").isLength({min:1}),
], async (req, res) => {
    if(verifyToken(req, res)){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(402).json(errors);
        }
        const name = req.body.name;
        const brand = req.body.brand;
        const type = req.body.type;
        const quantity = req.body.quantity;
        const pricePerQuartz = req.body.pricePerQuartz;
        const pricePerVehicle = req.body.pricePerVehicle;
    
        const request = {name, brand, type, quantity, pricePerQuartz, pricePerVehicle};
    
        Oil.findByIdAndUpdate(req.body._id, request, (error, data) => {
            if(error){
                return res.status(402).json({'error': error});
            }else{
                return res.status(200).json({message: 'Oil updated successfully'});
            }
        });
    }else{
        return res.status(402).json({'error': 'Unauthenticated'});
    }
});

router.get('/delete/:id', (req, res) => {
    if(verifyToken(req, res)){
        Oil.findByIdAndRemove(req.params.id, (error, data) => {
            if(error){
                return res.status(402).json({'error': error});
            }else{
                return res.status(200).json({message: 'Oil deleted successfully'});
            }
        });
    }else{
        return res.status(402).json({'error': 'Unauthenticated'});
    }
});

module.exports = router;