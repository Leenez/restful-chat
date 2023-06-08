const crypto = require("crypto");
const sessionModel = require("../models/session");
const userLastSeenModel = require("../models/userlastseen");
const messageModel = require("../models/message");

const setUserLastSeen = async (user) => {
    const currentDate = Date.now()
    userLastSeenModel.updateOne({username:user},{lastseen:currentDate})
    .then(() => {
        console.log("userLastSeen updated ",user,currentDate) // DEV
    }).catch((err) => {
        console.log("userLastSeen error ",err) // DEV
    })
}

const getUserLastSeen = async (user) => {
    const username = userLastSeen.findOne({"username":user}).then(function() {
        console.log("userLastSeen", username)
    }).catch((err) => {
        console.log("userLastSeen",err)
    })
}

const getChatMessages = () => {
    return ""
}

const recordMessage = () => {
    return ""
}

const createToken = () => {
    let token = crypto.randomBytes(64);
    return token.toString("hex");
}

const isUserLogged = (req,res,next) => {
    if(!req.headers.token) {
        return res.status(403).json({"Message":"Forbidden"})
    }
    sessionModel.findOne({"token":req.headers.token}).then(function(session) {
        if(!session) {
            return res.status(403).json({"Message":"Forbidden"})
        }
        let now = Date.now();
        if(now > session.ttl) {
            sessionModel.deleteOne({"_id":session._id}).then(function(){
                return res.status(403).json({"Message":"Forbidden"});
            }).catch(function(err) {
                console.log(err)
                return res.status(403).json({"Message":"Forbidden"});
            })
        } else {
            session.ttl = now + time_to_live_diff;
            req.session = {};
            req.session.user = session.user;
            session.save().then(function() {
                return next();
            }).catch(function(err) {
                console.log(err)
                return next();
            })
        }
    }).catch(function(err) {
        console.log(err);
        return res.status(403).json({"Message":"Forbidden"});
    });
}

module.exports = {createToken, isUserLogged, getUserLastSeen, recordMessage, getChatMessages}