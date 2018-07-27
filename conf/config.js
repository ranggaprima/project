require('dotenv').config();
var config = {};
config.connlimit= 10;
config.hostname = process.env.DATABASE_HOST;
config.username = process.env.DATABASE_USER;
config.password = process.env.DATABASE_PASS;
config.database = process.env.DATABASE_NAME;
config.port 	= process.env.PORT;
module.exports = config;
