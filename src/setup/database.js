const mongoose = require("mongoose");
// const Bluebird = require("bluebird");
const Organization = require("../models/organization.model");
const orgSchema = Organization.schema;
const User = require("../models/user.model");
const userSchema = User.schema;
const orgAccessToken = require("../models/orgApiAccessToken");
const orgApiTokenSchema = orgAccessToken.schema;
const sessionAuth = require("../models/sessionAuth");
const sessionAuthSchema = sessionAuth.schema;

// mongoose.Promise = Bluebird;

const options = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function dbConnection(BASE_DB_URI) {
  try {
    const db = mongoose.createConnection(BASE_DB_URI, options);

    db.on("error", (error) => {
      console.log(`Connection Error ${error}`);
    });
    db.once("open", async () => {
      console.log(`Client Database connected!!`);
    });

    // require all schemas
    db.model("User", userSchema);
    db.model("sessionAuth", sessionAuthSchema);
    return db;
  } catch (error) {
    console.log("Database Connection error", error);
  }
}

function adminDbConnection(BASE_DB_URI) {
  try {
    const db = mongoose.createConnection(BASE_DB_URI, options);

    db.on("error", (error) => {
      console.log(`Connection Error ${error}`);
    });
    db.once("open", async () => {
      console.log(`Admin Database connected!!`);
    });

    // require all schemas !?
    db.model("tenant", orgSchema);
    db.model("User", userSchema);
    db.model("ApiAccessToken", orgApiTokenSchema);
    return db;
  } catch (error) {
    console.log("AdminDbConnection error", error);
  }
}

function close() {
  mongoose.connection
    .close()
    .catch((err) => console.log(`Connection error:`, err));
}

// When the connection is disconnected
function disconnected() {
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose default connection disconnected");
    console.log(`Disconnected error:`, err);
  });
}

module.exports = {
  dbConnection,
  adminDbConnection,
  close,
  disconnected,
};
