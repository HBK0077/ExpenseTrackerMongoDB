// //here we define the table.
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    description:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }

});

module.exports = mongoose.model("Expenses", expenseSchema);

// const Sequelize = require('sequelize');
// const sequelize = require("../util/database");

// const expense = sequelize.define("expenses",{
//     id:{
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true
//     },
//     description:{
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     amount:{
//         type: Sequelize.DOUBLE,
//         allowNull: false
//     },
//     category:{
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })

// module.exports = expense;