var pg = require("pg");
const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "../../frontend/.env") });
require("dotenv").config({ path: "/etc/secrets/.env" }); // render's .env file in /etc/secrets
// require("dotenv").config();

console.log(process.env.PSQL_DATABASE);

var pool;
var config = {
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    max: 20,
};

module.exports = {
    getPool: function () {
        if (pool) return pool; // if it is already there, grab it here
        pool = new pg.Pool(config);
        return pool;
    },
};
