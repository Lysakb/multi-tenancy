const dotenv = require('dotenv');

// loading .env
dotenv.config();

const {
  NODE_ENV,
  PORT,
  BASE_DB_URI,
  HOST_NAME,
  ADMIN_DB_NAME,
  db_name,
  JWT_SECRET,
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  BASE_DB_URI,
  HOST_NAME,
  ADMIN_DB_NAME,
  db_name,
  JWT_SECRET,
};
