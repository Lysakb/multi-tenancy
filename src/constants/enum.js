const SESSION = {
  LOGIN_VALIDITY_IN_SECONDS: 30 * 24 * 60 * 60, //30DAYS,
  TOKEN_TYPES: {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
    API_KEY: "api_key",
  },
};

module.exports = {SESSION}