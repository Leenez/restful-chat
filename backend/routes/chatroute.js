const express = require("express")
const userModel = require("../models/user");
const sessionModel = require("../models/session");
const severFunctions = require("../functions/serverfunctions");

let router = express.Router()

router.post("/msg", function(req,res) {
    console.log("user send message")
    
})

router.get("/msgs",function(req,res) {
    console.log("return all user messages")
})

module.exports = router
