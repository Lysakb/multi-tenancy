const { getNamespace } = require("continuation-local-storage");
const Tenant = require("../models/tenant.model");
const tenantSchema = Tenant.schema;
const { BASE_DB_URI, ADMIN_DB_NAME } = require("../config/env");
const { adminDbConnection, dbConnection } = require("../setup/database");

let tenantMapping = {};
let mainDbInstance;

/**
 * Create knex instance for all the tenants defined in common database and store in a map.
 **/
const connectAllDb = async () => {
  try {
    mainDbInstance = await selectDB(BASE_DB_URI, true);
    console.log("Connecting to admin database...");

    const tenantModel = await mainDbInstance.model("Tenant", tenantSchema);

    const tenant = await tenantModel.find({}).lean();

    // if (!tenant || tenant.length < 1) {
    //   throw new Error("No tenant/Organization was found")
    // };

    await connectOtherOrg(tenant);

    console.log(`Connecting to (${tenant.length}) database...., `);
  } catch (error) {
    console.log("Connection Error", error);
    return;
  }
};

const connectOtherOrg = async (data) => {
  if (!data) throw new Error("No tenants found");
  return data
    .map(async (tenant, i) => {
      const initDb = await selectDB(tenant?.tenantInfo.db_url);
      tenantMapping[tenant.name.toLowerCase()] = initDb;
      // console.log(tenantMapping)
      return {
        [tenant.name]: initDb,
      };
    })
    .reduce((prev, next) => {
      return Object.assign({}, prev, next);
    }, {});
};

/**
 * Get the connection information (knex instance) for the given tenant's slug.
 */
const getConnectionByTenant = (tenantName) => {
  if (tenantMapping && !tenantMapping[tenantName]) {
    throw new Error("Tenant not found ", tenantName);
  } else {
    return tenantMapping[tenantName];
  }
};

/**
 * Get the admin db connection.
 */
const getAdminConnection = () => {
  if (mainDbInstance) {
    console.log("Getting adminDbConnection");
    return mainDbInstance;
  }
};

/**
 * Get the connection information (knex instance) for current context. Here we have used a
 * getNamespace from 'continuation-local-storage'. This will let us get / set any
 * information and binds the information to current request context.
 */
const getConnection = () => {
  const nameSpace = getNamespace("tenants");
  const conn = nameSpace.get("connection");

  if (!conn) {
    throw new Error("Connection is not set for any tenant database");
  }

  return conn;
};

const selectDB = async (uri, admin = false) => {
  if (admin) {
    return adminDbConnection(uri);
  }
  return await dbConnection(uri);
};

module.exports = {
  connectAllDb,
  connectOtherOrg,
  getAdminConnection,
  getConnection,
  getConnectionByTenant,
  selectDB,
};
