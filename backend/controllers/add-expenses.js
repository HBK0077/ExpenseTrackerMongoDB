//here we add, get and deleted the expense
const expense = require("../models/expense");
const user = require("../models/user"); 
const order = require("../models/orders");
//const sequelize = require("../util/database");
require('dotenv').config();
exports.addExpenses = async(req,res,next)=>{
    try{
        
        const description = req.body.description;
        const amount = req.body.amount;
        const category = req.body.category;
        const userId = req.body.userId;
        console.log(description, amount);
        //let totalExpense=0;
        const data = new expense({
            description: description,
            amount: amount,
            category: category,
            userId: userId 
        });
        await data.save();
        const users = await user.find({
            _id: userId
        })
        totalExpense = Number(users[0].totalExpense)+ Number(amount);
        await user.findOneAndUpdate({
            _id: userId
        },{
            totalExpense: totalExpense
        })
        res.json({newexpense: data, success: true});
    }
    catch(err){
        console.log(err);
        res.json({
            Error: err
        });
        
       
    }
}

exports.getExpenses = async(req,res,next)=>{
    try{
        const userId = req.user[0]._id;
        const data = await expense.find({
            userId: userId
        });
        console.log(data);
            return res.json({allExpense: data});
    }catch(err){
        console.log("Error in getting expense");
        return res.json({Error: err});
    }
}


exports.deleteExpense = async(req,res,next)=>{
    try{
        console.log("Insedddeedddhbfjnd");
        //console.log("Insedddeedddhbfjnd");
        if(!req.params.id){
            throw new Error("Id is mandatory");
        }
    const detailsId = req.params.id; // this comes from the url
    const exp = await expense.find({
            _id: detailsId
    })
    //console.log(exp);
    //console.log(exp[0].amount);
    const users = req.user;
    //console.log(users[0].totalExpense)
    
    const totalExp = (users[0].totalExpense) - (exp[0].amount);
    console.log(totalExp);
    const deleted = await expense.findByIdAndRemove({
            _id:detailsId, 
            userId: users._id
    });
    //console.log(deleted);
    console.log(totalExp);
    const userId = users[0]._id;
    console.log(userId);
    const updated = await user.updateOne({
        _id: userId
    },{
        totalExpense: totalExp
    });
    console.log(updated);
    res.json({msg:"Deleted", success:true});
    }
    catch(err){
        console.log("Error in delete Method");
        res.json({Error: err});
    }
 }


exports.showNumberExpense = async(req,res,next)=>{
    try{
        const{page,pagesize}=req.query; //here we will get the value for pagination
        const limits=+pagesize
        const userId = req.user[0]._id;
        const data=  await expense.find({
            userId: userId
        },{
            offset:(page-1)*pagesize
        }).limit(limits);
        // remeber that inclusion and exclusion of the values in the projection is not supported in mongodb.
        console.log(data)
        res.json({Data:data})
    }catch(e){
        console.log("pagination error-->",e)
        res.json({Error:e})
    }

}