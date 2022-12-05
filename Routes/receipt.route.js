let mongoose = require("mongoose");
let express = require("express");
let router = express.Router();
const { check, validationResult } = require("express-validator");

let Receipt = require("../Models/Receipt");
const { verifyToken } = require("../Helpers");
const today = new Date();

router.post(
  "/add",
  [
    check("customer", "Receipt Customer field is required").not().isEmpty(),
    check("vehicle", "Vehicle name field is required").not().isEmpty(),
    check("status", "Receipt payment status field is required").not().isEmpty(),
    check("date", "Receipt date is required").not().isEmpty(),
    // check('tiresuantity', "Quantity must be at least 1").isLength({min:1}),
    // check('pricePerQuartz', "Price Per Quartz field must be at least 1").isLength({min:1}),
    // check('pricePerVehicle', "Price Per Quartz field must be at least 1").isLength({min:1}),
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
        date
      };

      Receipt.create(request, (error, data) => {
        if (error) {
          return res.status(402).json({ error: error });
        } else {
          return res.status(200).json(data);
        }
      });
    } else {
      return res.status(402).json({ error: "Unauthenticated" });
    }
  }
);

router.get("/", (req, res) => {
  if (verifyToken(req, res)) {
    Receipt.find((error, data) => {
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

router.get("/today", (req, res) => {
  if (verifyToken(req, res)) {
    Receipt.find({$or:[{date:today}]},(error, data) => {
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
router.get("/unpaid", (req, res) => {
  if (verifyToken(req, res)) {
    Receipt.find({$or:[{status:'Unpaid'}]},(error, data) => {
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

module.exports = router;
