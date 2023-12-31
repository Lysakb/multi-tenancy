const express = require('express');
require('express-async-errors');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const orgRouter = require('../routes/organization.route');
const orgApiRouter = require("../routes/orgApi.route");
const userRouter = require("../routes/user.route");
// require('../setup/database');
// const { connectAllDb } = require('../helper/connectionManager');
// require('../helper/connectionResolver')

const app = express();
// const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(limiter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// connectAllDb();

app.use("/admin", orgRouter);
app.use("/admin/token", orgApiRouter);
app.use("/user", userRouter);

//default route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to multitenancy-architecture',
  });
});

module.exports = app;
