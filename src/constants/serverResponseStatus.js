const httpStatus = require("http-status");

const serverResponseStatus = {
  RESPONSE_STATUS_FAILURE: "failure",
  RESPONSE_STATUS_SUCCESS: "success",
  OK: httpStatus.OK,
  CREATED: httpStatus.CREATED,
  INTERNAL_SERVER_ERROR: httpStatus.INTERNAL_SERVER_ERROR,
  NOT_FOUND: httpStatus.NOT_FOUND,
  NOT_AUTHORIZED: httpStatus.UNAUTHORIZED,
  BAD_REQUEST: httpStatus.BAD_REQUEST,
};

module.exports = serverResponseStatus;
