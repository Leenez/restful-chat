const express = require("express");
const chatRoute = require("./routes/chatroute");
const accountsRoute = require("./routes/accountsroute");
const config = require("../config");
const middleWare = require("./functions/middleware");
const dbAccess = require("./functions/dbaccess");

const startServer = async () => {
    await dbAccess.openMongooseConnection();

    let app = express();
    app.use(express.json());
    
    let port = config.server_port 
    
    //app.use("/api",middleWare.isUserLogged,chatRoute);
    app.use("",accountsRoute)
    app.use("/api",chatRoute)

    app.listen(port);
    console.log("Running in port",port);
}

startServer()









