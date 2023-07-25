//here we define the routes for get post of the expesnse.
const express = require("express");
const routes = express.Router();
const admin = require("../controllers/add-expenses");

const userAuthentication = require('../middleware/auth');


routes.post("/add-expenses", userAuthentication.authenticate, admin.addExpenses);



routes.get("/show-expenses", userAuthentication.authenticate ,admin.getExpenses);


routes.delete("/delete-expenses/:id",userAuthentication.authenticate, admin.deleteExpense);

routes.get("/pagination", userAuthentication.authenticate, admin.showNumberExpense);





module.exports = routes;