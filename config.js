/*const config = () => {
const mongo_url = process.env.MONGODB_URL;
const mongo_user=process.env.MONGODB_USER;
const mongo_password=process.env.MONGODB_PASSWORD;
const database="chatdatabase";
const time_to_live_diff=3600000;
const server_port=3001;
//const client_port = 3000
};*/

const config = {
    mongo_url:process.env.MONGODB_URL,
    mongo_user:process.env.MONGODB_USER,
    mongo_password:process.env.MONGODB_PASSWORD,
    database:"chatdatabase",
    time_to_live_diff:3600000,
    server_port:3001
}

module.exports = config

