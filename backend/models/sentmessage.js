const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    user:{type:String,index:true},
    message:String
})

module.exports = mongoose.model("SentMessage",Schema);