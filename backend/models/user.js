// //here we define the table.
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isPremium:{
        type: Boolean
    },
    totalExpense:{
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Users", userSchema);

// const Sequelize = require('sequelize');
// const sequelize = require("../util/database");

// const user = sequelize.define("users",{
//     id:{
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true
//     },
//     name:{
//         type: Sequelize.STRING,
//         allowNull: false,
//     },
//     email:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     password:{
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     isPremium:{
//         type: Sequelize.BOOLEAN
//     },
//     totalExpense:{
//         type: Sequelize.INTEGER,
//         defaultValue: 0
//     }
// })

// module.exports = user;