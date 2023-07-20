const cls = require("continuation-local-storage");
const { getConnectionByTenant, getAdminConnection } = require("./connectionManager");


// Create a namespace for the application.


/**
 * Get the connection instance for the given tenant's name and set it to the current context.
 */
const resolveCustomer = (req, res, next) => {
  const tenant = req.headers.tenant || "Quiickops";
  console.log("tenant middleware... ", { tenant });

  if (!tenant) {
    throw new Error("Please provide tenant's name to connect");
  }

  // Run the application in the defined namespace. It will contextualize every underlying function calls.
  let namespace = cls.getNamespace("tenants") || cls.createNamespace("tenants");
  let context = namespace.createContext();
  namespace.enter(context);
  try {
    namespace.set("connection", getConnectionByTenant(tenant));
    console.log('after connecting to customer....')
    namespace.set("customerId", tenant);
    return next();
  } catch (error) {
    next(error);
  }
};

/**
 * Get the admin db connection instance and set it to the current context.
 */
const resolveAdmin = (req, res, next) => {
  // Run the application in the defined namespace. It will contextualize every underlying function calls.
  let namespace = cls.getNamespace("tenants") || cls.createNamespace("tenants");
  let context = namespace.createContext();
  namespace.enter(context);
  try {
    namespace.set("connection", getAdminConnection());
    console.log("after connecting to admin...");
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = { resolveCustomer, resolveAdmin };
