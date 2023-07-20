const database = require('./setup/database.js');
const app = require('./setup/express.js');
const logging = require('./setup/logging.js');
// const {connectDb} = require('./setup/database.js');

logging();


module.exports = app;
