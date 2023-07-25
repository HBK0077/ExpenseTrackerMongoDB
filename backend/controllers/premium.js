const user = require("../models/user"); 
const jwt = require('jsonwebtoken'); 
const RazorPay = require('razorpay');
const order = require("../models/orders");
require('dotenv').config();


exports.premiumMembership = async(req,res,next)=>{
    try{
            var rzp = new RazorPay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET
            })
            //console.log(rzp);
            const amount=2500;
            rzp.orders.create({amount, currency: "INR"}, async(err,orderr)=>{
                if(err){
                    throw new Error(JSON.stringify(err));
                }
                const data = new order({
                    orderId: orderr.id, //orderr in line 20
                    status: "Pending",
                    userId: req.user[0]._id
                })
                await data.save();
                return res.json({
                    orderr, key_id:rzp.key_id
                });
            })
    }catch(err){
        console.log("erron in bying premium (premium.js in controllers)");
        res.json({Error: err});
    }
}


function generateAccessToken(id, isPremium){
    return jwt.sign({userId: id, isPremium}, 'secretKeyIsBiggerValue')
}


exports.updateStatus = async(req,res,next)=>{
    try{
        const {payment_id, order_id} = req.body; // we get the data from the body of the req
        const userId = req.user[0]._id; 
        console.log(userId);
        console.log(payment_id, order_id);
        const orders = await order.find({
                'orderId': order_id
        });
        console.log(orders);
        if(payment_id === null){
            order.updateMany({
                paymentId: payment_id, 
                status:"FAILED",
                userId: userId
            });
            return res.json({success: false, msg:"Payment Failed"})
        }
        await order.updateMany({
            paymentId: payment_id, 
            status: "SUCCESSFUL",
            userId: userId
        });
        //console.log(payment_id);
        await user.findOneAndUpdate(
            {
                _id: userId
            },
            {
                isPremium: true
            }
            );
        return res.json({success: true, msg:"Transaction Sccessfull", token: generateAccessToken(req.user.id, true)});
        
    }catch(err){
        console.log("error in updating premuim status (premium.js in controllers)");
        res.json({Err: err});
    }
}
