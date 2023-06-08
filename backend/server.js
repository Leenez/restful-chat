const express = require("express");
const accountsRoute = require("./routes/accountsroute");
const chatRoute = require("./routes/chatroute");
const dbAccess = require("./functions/dbaccess");
const serverFunctions = require("./functions/serverfunctions");
const config = require("../config");

dbAccess.openMongooseConnection();

let app = express();
app.use(express.json);

app.use("/", accountsRoute);

app.use("/api",serverFunctions.isUserLogged,chatRoute);

app.listen(config.server_port);

console.log("Listening ",config.server_port)