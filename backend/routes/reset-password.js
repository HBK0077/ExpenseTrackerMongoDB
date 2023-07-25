const express = require('express');
const routes = express.Router();


const resetpasswordController = require('../controllers/resetpassword');


routes.get('/updatepassword/:rid', resetpasswordController.updatepassword)

routes.get('/resetpassword/:id', resetpasswordController.resetpassword)

routes.post('/forgotpassword', resetpasswordController.forgotpassword)

module.exports = routes;