//here we define the routes for get post of the expesnse.
const express = require("express");
const routes = express.Router();
const admin = require("../controllers/addexpenses");

const userAuthentication = require('../middleware/auth');


routes.post("/expenses", userAuthentication.authenticate, admin.addExpenses);



routes.get("/expenses", userAuthentication.authenticate ,admin.getExpenses);


routes.delete("/expenses/:id",userAuthentication.authenticate, admin.deleteExpense);

routes.get("/pagination", userAuthentication.authenticate, admin.showNumberExpense);





module.exports = routes;