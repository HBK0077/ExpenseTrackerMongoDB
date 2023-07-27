const express = require("express");
const routes = express.Router();
const userControl = require("../controllers/usercontrol");



//adding user 
routes.post("/user", userControl.addUser);

//login user
routes.post("/login", userControl.userLogin);



module.exports = routes;