// require('./setup/database.js');
const app = require('./setup/express.js');
const logging = require('./setup/logging.js');
const { connectAllDb } = require('./helper/connectionManager.js');

logging();
connectAllDb();

module.exports = app;
