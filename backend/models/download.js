const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const download = new Schema({
    fileUrl:{
        type: String
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
});

module.exports = mongoose.model("Download", download)
// const Sequelize = require('sequelize');
// const sequelize = require("../util/database");

// const download = sequelize.define("downloadFile",{
//     id:{
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true
//     },
//     fileUrl:{
//         type: Sequelize.STRING
//     }
// });

// module.exports = download;