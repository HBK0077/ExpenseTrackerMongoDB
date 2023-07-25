const mongoose = require("mongoose");
const uuid=require("uuid")
const Schema = mongoose.Schema;

const forgotPasswordSchema = new Schema({
    _id: { 
        type: String, 
        default: function genUUID() {
            uuid.v4()
        }
    },
    active:{
        type: Boolean
    },
    expiresby:{
        type: Date
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
});

module.exports = mongoose.model("Forgotpasswords", forgotPasswordSchema)
// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// //id, name , password, phone number, role

// const Forgotpassword = sequelize.define('forgotpassword', {
//     id: {
//         type: Sequelize.UUID,
//         allowNull: false,
//         primaryKey: true
//     },
//     active: Sequelize.BOOLEAN,
//     expiresby: Sequelize.DATE
// })

// module.exports = Forgotpassword;