import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.js')[env];

let connection: Sequelize = new Sequelize(config.database, config.username, config.password, config);

export default connection;