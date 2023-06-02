const express = require("express");
const accountsRoute = require("/backend/routes/accountsroute");
const chatRoute = require("/backend/routes/chatroute");

const port = 3001;

let app = express();
app.use(express.json);

app.listen(port);