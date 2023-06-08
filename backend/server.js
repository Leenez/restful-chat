const express = require("express");
const chatRoute = require("./routes/chatroute");
const accountsRoute = require("./routes/accountsroute");
const config = require("../config");
const serverFunctions = require("./functions/serverfunctions");
const dbAccess = require("./functions/dbaccess");

const startServer = async () => {
    await dbAccess.openMongooseConnection();

    let app = express();
    app.use(express.json());
    
    let port = config.server_port 
    
    app.use("/api",serverFunctions.isUserLogged,chatRoute);
    app.use("",accountsRoute)

    app.listen(port);
    console.log("Running in port",port);
}

startServer()









