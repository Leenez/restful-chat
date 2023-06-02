const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    username:{type:String,unique:true},
    lastseen:Date
})

module.exports = mongoose.model("UserLastSeen",Schema);