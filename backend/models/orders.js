// //here we define the table.
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const order = new Schema({
    paymentId:{
        type: String
    },
    orderId:{
        type: String
    },
    status:{
        type: String
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
});

module.exports = mongoose.model("Order", order);
// const Sequelize = require('sequelize');
// const sequelize = require("../util/database");

// const order = sequelize.define("orders",{
//     id:{
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true
//     },
//     paymentid: Sequelize.STRING,
//     orderid: Sequelize.STRING,
//     status: Sequelize.STRING
// })

// module.exports = order;