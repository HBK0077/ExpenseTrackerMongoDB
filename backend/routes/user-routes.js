const express = require("express");
const routes = express.Router();
const userControl = require("../controllers/user-control");



//adding user 
routes.post("/add-user", userControl.addUser);

//login user
routes.post("/user-login", userControl.userLogin);



module.exports = routes;