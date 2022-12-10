let mongoose = require("mongoose");
let express = require("express");
let router = express.Router();
const { check, validationResult } = require("express-validator");

let Receipt = require("../Models/Receipt");
let Customer = require("../Models/Customer");
let Vehicle = require("../Models/Vehicle");

const { verifyToken } = require("../Helpers");

const today = new Date();

//current day
const today_start = new Date();
today_start.setUTCHours(0, 0, 0, 0);
const today_end = new Date();
today_end.setUTCHours(23, 59, 59, 999);
console.log('today', today, 'today start', today_start, 'today end', today_end);

//current Week
const week_start = new Date(today.setDate(today.getDate() - today.getDay()));
week_start.setUTCHours(0, 0, 0, 0);
const week_end = new Date(today.setDate(today.getDate() - today.getDay() + 6));
week_end.setUTCHours(23, 59, 59, 999);
console.log('today', today, 'week start', week_start, 'week end', week_end);

//current Month
const month_start = new Date(today.getFullYear(), today.getMonth(), 1);
month_start.setUTCHours(0, 0, 0, 0);
const month_end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
month_end.setUTCHours(23, 59, 59, 999);

console.log('today', today, 'month start', month_start, 'month end', month_end);
//current Year
const current_year = new Date().getFullYear();
const year_start = new Date(current_year, 0, 1);
year_start.setUTCHours(0,0,0,0);
const year_end = new Date(current_year, 11, 31)
year_end.setUTCHours(23, 59, 59, 999);
console.log('today', today, 'year start', year_start, 'year end', year_end);

router.get("/daily", (req, res) => {
  if (verifyToken(req, res)) {
    let receipts = [];
    let customers = [];
    let vehicles = [];
    Receipt.find({$or:[{date:today_start}]},(error, receipts_data) => {
      if (error) {
        return res.status(402).json({ error: error });
      } else {
        receipts = receipts_data;

        Customer.find({$or:[{createdAt:{$gte: today_start, $lt: today_end}}]},(error, customers_data) => {
          if (error) {
            return res.status(402).json({ error: error });
          } else {
            customers = customers_data;

            Vehicle.find({$or:[{createdAt:{$gte: today_start, $lt: today_end}}]},(error, vehicles_data) => {
              if (error) {
                return res.status(402).json({ error: error });
              } else {
                vehicles = vehicles_data;
                return res
                  .status(200)
                  .json({
                    customers: customers,
                    vehicles: vehicles,
                    receipts: receipts,
                  });
              }
            });
          }
        });
      }
    });
  } else {
    return res.status(402).json({ error: "Unauthenticated" });
  }
});


router.get("/weekly", (req, res) => {
  if (verifyToken(req, res)) {
    let receipts = [];
    let customers = [];
    let vehicles = [];
    Receipt.find({$or:[{date:{$gte: week_start, $lt: week_end}}]},(error, receipts_data) => {
      if (error) {
        return res.status(402).json({ error: error });
      } else {
        receipts = receipts_data;

        Customer.find({$or:[{createdAt:{$gte: week_start, $lt: week_end}}]},(error, customers_data) => {
          if (error) {
            return res.status(402).json({ error: error });
          } else {
            customers = customers_data;

            Vehicle.find({$or:[{createdAt:{$gte: week_start, $lt: week_end}}]},(error, vehicles_data) => {
              if (error) {
                return res.status(402).json({ error: error });
              } else {
                vehicles = vehicles_data;
                return res
                  .status(200)
                  .json({
                    customers: customers,
                    vehicles: vehicles,
                    receipts: receipts,
                  });
              }
            });
          }
        });
      }
    });
  } else {
    return res.status(402).json({ error: "Unauthenticated" });
  }
});

router.get("/monthly", (req, res) => {
  if (verifyToken(req, res)) {
    let receipts = [];
    let customers = [];
    let vehicles = [];
    Receipt.find({$or:[{date:{$gte: month_start, $lt: month_end}}]},(error, receipts_data) => {
      if (error) {
        return res.status(402).json({ error: error });
      } else {
        receipts = receipts_data;

        Customer.find({$or:[{createdAt:{$gte: month_start, $lt: month_end}}]},(error, customers_data) => {
          if (error) {
            return res.status(402).json({ error: error });
          } else {
            customers = customers_data;

            Vehicle.find({$or:[{createdAt:{$gte: month_start, $lt: month_end}}]},(error, vehicles_data) => {
              if (error) {
                return res.status(402).json({ error: error });
              } else {
                vehicles = vehicles_data;
                return res
                  .status(200)
                  .json({
                    customers: customers,
                    vehicles: vehicles,
                    receipts: receipts,
                  });
              }
            });
          }
        });
      }
    });
  } else {
    return res.status(402).json({ error: "Unauthenticated" });
  }
});

router.get("/annually", (req, res) => {
  if (verifyToken(req, res)) {
    let receipts = [];
    let customers = [];
    let vehicles = [];
    Receipt.find({$or:[{date:{$gte: year_start, $lt: year_end}}]},(error, receipts_data) => {
      if (error) {
        return res.status(402).json({ error: error });
      } else {
        receipts = receipts_data;

        Customer.find({$or:[{createdAt:{$gte: year_start, $lt: year_end}}]},(error, customers_data) => {
          if (error) {
            return res.status(402).json({ error: error });
          } else {
            customers = customers_data;

            Vehicle.find({$or:[{createdAt:{$gte: year_start, $lt: year_end}}]},(error, vehicles_data) => {
              if (error) {
                return res.status(402).json({ error: error });
              } else {
                vehicles = vehicles_data;
                return res
                  .status(200)
                  .json({
                    customers: customers,
                    vehicles: vehicles,
                    receipts: receipts,
                  });
              }
            });
          }
        });
      }
    });
  } else {
    return res.status(402).json({ error: "Unauthenticated" });
  }
});

module.exports = router;
