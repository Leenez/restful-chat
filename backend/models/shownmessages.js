const mongoose = require("mongoose");
import sentmessage from "/backend/models/sentmessage";

let Schema = mongoose.Schema({
    messages:[sentmessage]
})

module.exports = mongoose.model("ShownMessages",Schema);