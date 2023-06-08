const express = require("express")
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userModel = require("../models/user");
const sessionModel = require("../models/session");

let router = express.Router()

router.post("/msg", function(req,res) {
    
})

router.get("/msgs",function(req,res) {
    
})

module.exports = router
