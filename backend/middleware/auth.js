const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async(req, res, next)=>{
    try{
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token, 'secretKeyIsBiggerValue');
        console.log("User ID>>>>>>>>>>>>>>>>>", user.userId);
        const person = await User.find({
            "_id":user.userId
        })
            req.user = person;
            //console.log(req.user.id);
            next();
            
    }
    catch(error){
        console.log(error);
        return res.status(401).json({sucess: false});
    }
}

module.exports = {
    authenticate
}