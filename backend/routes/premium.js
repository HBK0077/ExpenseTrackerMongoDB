const express = require("express");
const routes = express.Router();
const admin = require("../controllers/addexpenses");
const premium = require("../controllers/premium")
const userAuthentication = require('../middleware/auth');
const RazorPay = require('razorpay');

//premium membership
routes.get("/premiummembership", userAuthentication.authenticate, premium.premiumMembership);

//update Transactions
routes.post("/updatetransactionstatus", userAuthentication.authenticate, premium.updateStatus);



module.exports = routes;