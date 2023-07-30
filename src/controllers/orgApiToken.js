const tenantApiTokenServices = require("../services/orgApiAcessToken");

const createToken = async (req, res) => {
  try {
    const data = await tenantApiTokenServices.createApiAccessToken(req.body);
    return res.status(data.statusCode).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Unable to create user at the moment",
      error: error.message,
    });
  }
};

module.exports = {
  createToken,
};
