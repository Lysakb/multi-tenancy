const serverResponseStatus = require("../constants/serverResponseStatus");

const buildResponse = (response) => {
  return {
    ...response,
    status: serverResponseStatus.RESPONSE_STATUS_SUCCESS,
    statusCode: serverResponseStatus.OK,
  };
};

const buildCreateResponse = (response) => {
  return {
    ...response,
    status: serverResponseStatus.RESPONSE_STATUS_SUCCESS,
    statusCode: serverResponseStatus.CREATED,
  };
};

const buildFailedResponse = (response) => {
  return {
    ...response,
    status: serverResponseStatus.RESPONSE_STATUS_FAILURE,
    statusCode: serverResponseStatus.BAD_REQUEST,
  };
};

const notFoundResponse = (response) => {
  return {
    ...response,
    status: serverResponseStatus.RESPONSE_STATUS_FAILURE,
    statusCode: serverResponseStatus.NOT_FOUND,
  };
};

const internalServerError = (response) => {
  return {
    ...response,
    status: serverResponseStatus.RESPONSE_STATUS_FAILURE,
    statusCode: serverResponseStatus.INTERNAL_SERVER_ERROR,
  };
};

const unAuthorizedResponse = (response) => {
  return {
    ...response,
    status: serverResponseStatus.RESPONSE_STATUS_FAILURE,
    statusCode: serverResponseStatus.NOT_AUTHORIZED,
  };
};

module.exports = Object.freeze({
  buildResponse,
  buildCreateResponse,
  buildFailedResponse,
  notFoundResponse,
  internalServerError,
  unAuthorizedResponse,
});
