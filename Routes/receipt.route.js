let mongoose = require("mongoose");
let express = require("express");
let router = express.Router();
const { check, validationResult } = require("express-validator");

let Receipt = require("../Models/Receipt");
let Oil = require('../Models/Oil');
let Tire = require('../Models/Tire');

const { verifyToken } = require("../Helpers");
const today = new Date();
today.setUTCHours(0, 0, 0, 0);
router.post(
  "/add",
  [
    check("customer", "Receipt Customer field is required").not().isEmpty(),
    check("vehicle", "Vehicle name field is required").not().isEmpty(),
    check("status", "Receipt payment status field is required").not().isEmpty(),
    check("date", "Receipt date is required").not().isEmpty(),
  ],
  async (req, res) => {
    if (verifyToken(req, res)) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(402).json(errors);
      }
      const customer = req.body.customer;
      const vehicle = req.body.vehicle;
      const services = req.body.services;
      const tires = req.body.tires;
      const tiresPrice = req.body.tiresPrice;
      const tiresQuantity = req.body.tiresQuantity;
      const oil = req.body.oil;
      const extraOilPrice = req.body.extraOilPrice;
      const extraOilQuantity = req.body.extraOilQuantity;
      const taxInclude = req.body.taxInclude;
      const taxType = req.body.taxType;
      const tax = req.body.tax;
      const discountInclude = req.body.discountInclude;
      const discountType = req.body.discountType;
      const discount = req.body.discount;
      const totalPrice = req.body.totalPrice;
      const status = req.body.status;
      const paymentType = req.body.paymentType;
      const paid = req.body.paid;
      const remaining = req.body.remaining;
      const date = req.body.date;
      const user_id = req.body.user_id;

      const request = {
        customer,
        vehicle,
        services,
        tires,
        tiresPrice,
        tiresQuantity,
        tiresQuantity,
        oil,
        extraOilPrice,
        extraOilQuantity,
        taxInclude,
        taxType,
        tax,
        discountInclude,
        discountType,
        discount,
        totalPrice,
        status,
        paymentType,
        paid,
        remaining,
        date,
        user_id
      };
      
      Receipt.create(request, (error, data) => {
        if (error) {
          return res.status(402).json({ error: error });
        } else {
          // return res.status(200).json(data);
          if (req.body.oil != '' && req.body.tires != '') {
              Oil.findByIdAndUpdate({_id: req.body.oil._id}, {$inc:{'quantity' : -(5 + req.body.extraOilQuantity)}}, (error1, data1) => {
                if (error) {
                  return res.status(402).json({error:error1});
                } else {
                  Tire.findByIdAndUpdate({_id: req.body.tires._id}, {$inc:{'quantity' : -req.body.tiresQuantity}}, (error2, data2) => {
                    if (error) {
                      return res.status(402).json({error:error2});
                    }else{
                      return res.status(200).json(data);
                    }
                  })
                }  
              });
          }
          else if(req.body.oil != '' && req.body.tires == ''){
            Oil.findByIdAndUpdate({_id: req.body.oil._id}, {$inc:{'quantity' : -(5 + req.body.extraOilQuantity)}}, (error1, data1) => {
              if (error) {
                return res.status(402).json({error:error1});
              } else {
                return res.status(200).json(data);
              }  
            });
          }
          else if(req.body.oil == '' && req.body.tires != ''){
            Tire.findByIdAndUpdate({_id: req.body.tires._id}, {$inc:{'quantity' : -req.body.tiresQuantity}}, (error2, data2) => {
              if (error) {
                return res.status(402).json({error:error2});
              }else{
                return res.status(200).json(data);
              }
            })
          }
          else {
            return res.status(200).json(data);
          }
          
        }
      });


    } else {
      return res.status(402).json({ error: "Unauthenticated" });
    }
  }
);

router.get("/all/:user_id", (req, res) => {
  if (verifyToken(req, res)) {
    Receipt.find({'user_id':req.params.user_id},(error, data) => {
      if (error) {
        return res.status(402).json({ error: error });
      } else {
        return res.status(200).json(data);
      }
    });
  } else {
    return res.status(402).json({ error: "Unauthenticated" });
  }
});

router.get("/today/:user_id", (req, res) => {
  if (verifyToken(req, res)) {
    Receipt.find({$or:[{'user_id':req.params.user_id, date:today}]},(error, data) => {
      if (error) {
        return res.status(402).json({ error: error });
      } else {
        return res.status(200).json(data);
      }
    });
  } else {
    return res.status(402).json({ error: "Unauthenticated" });
  }
});
router.get("/unpaid/:user_id", (req, res) => {
  if (verifyToken(req, res)) {
    Receipt.find({$or:[{'user_id':req.params.user_id, status:'Unpaid'}]},(error, data) => {
      if (error) {
        return res.status(402).json({ error: error });
      } else {
        return res.status(200).json(data);
      }
    });
  } else {
    return res.status(402).json({ error: "Unauthenticated" });
  }
});
router.get("/details/:_id", (req, res) => {
  if (verifyToken(req, res)) {
    Receipt.findById(req.params._id,(error, data) => {
      if (error) {
        return res.status(402).json({ error: error });
      } else {
        return res.status(200).json(data);
      }
    });
  } else {
    return res.status(402).json({ error: "Unauthenticated" });
  }
});

router.post(
  "/update",
  [
    check("customer", "Receipt Customer field is required").not().isEmpty(),
    check("vehicle", "Vehicle name field is required").not().isEmpty(),
    check("status", "Receipt paayment status field is required")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    if (verifyToken(req, res)) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(402).json(errors);
      }
      const customer = req.body.customer;
      const vehicle = req.body.vehicle;
      const services = req.body.services;
      const tires = req.body.tires;
      const tiresPrice = req.body.tiresPrice;
      const tiresQuantity = req.body.tiresQuantity;
      const oil = req.body.oil;
      const extraOilPrice = req.body.extraOilPrice;
      const extraOilQuantity = req.body.extraOilQuantity;
      const taxInclude = req.body.taxInclude;
      const taxType = req.body.taxType;
      const tax = req.body.tax;
      const discountInclude = req.body.discountInclude;
      const discountType = req.body.discountType;
      const discount = req.body.discount;
      const totalPrice = req.body.totalPrice;
      const status = req.body.status;
      const paymentType = req.body.paymentType;
      const paid = req.body.paid;
      const remaining = req.body.remaining;

      const request = {
        customer,
        vehicle,
        services,
        tires,
        tiresPrice,
        tiresQuantity,
        tiresQuantity,
        oil,
        extraOilPrice,
        extraOilQuantity,
        taxInclude,
        taxType,
        tax,
        discountInclude,
        discountType,
        discount,
        totalPrice,
        status,
        paymentType,
        paid,
        remaining,
      };

      Receipt.findByIdAndUpdate(req.body._id, request, (error, data) => {
        if (error) {
          return res.status(402).json({ error: error });
        } else {
          return res
            .status(200)
            .json({ message: "Receipt updated successfully" });
        }
      });
    } else {
      return res.status(402).json({ error: "Unauthenticated" });
    }
  }
);

router.post("/add-payment",[
  check("amount_paid", "Please Enter Some Amount").not().isEmpty(),
    check("payment_type", "Please Select a Payment Type").not().isEmpty(),
    check("payment_date", "Please Enter Payment Date").not().isEmpty(),
], async(req, res) => {
    console.log(req.body);
    if (verifyToken(req, res)) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(402).json(errors);
      }
      const receipt_id = req.body.receipt_id;

      const payment = {
       amount_due : req.body.amount_due,
       amount_paid : req.body.amount_paid,
       amount_remaining : req.body.amount_remaining,
       payment_type : req.body.payment_type,
       payment_date : req.body.payment_date,
      }
      

      Receipt.findByIdAndUpdate({_id:receipt_id},{$push:{payments: payment}, 
        $set:{
          status: req.body.status,
          paymentType:req.body.payment_type,
          paid:req.body.paid,
          remaining:req.body.amount_remaining,
        }}, (error, data) => {
        if (error) {
          return res.status(402).json({ error: error });
        } else {
          return res
            .status(200)
            .json({ message: "Payment Added successfully" });
        }
      });
    } else {
      return res.status(402).json({ error: "Unauthenticated" });
    }
});
router.get("/delete/:id", (req, res) => {
  if (verifyToken(req, res)) {
    Receipt.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return res.status(402).json({ error: error });
      } else {
        return res
          .status(200)
          .json({ message: "Receipt deleted successfully" });
      }
    });
  } else {
    return res.status(402).json({ error: "Unauthenticated" });
  }
});

router.get('/customer/:id', (req, res) => {
  if(verifyToken(req, res)){
      Receipt.find({"customer._id": req.params.id},(error, data) => {
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

module.exports = router;
