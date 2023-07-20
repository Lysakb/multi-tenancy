const mongoose = require('mongoose');
const { SESSION } = require('../constants/enum');


  const sessionAuthSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      organization: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tenant",
      },
      token_type: { type: String, enum: Object.values(SESSION.TOKEN_TYPES), default: "access_token"}, //enum(access_token, refresh_token, api_key)
      token_hash: { type: String,}, //rehash of public_api_key
      host: String, // whitelist domain name
      // scope: { type: String, require: true}, // get the value by ["payroll.read", "payroll.write"].join(,)
      revoked: { type: Boolean, default: false },
      usage: [
        {
          date: { type: String },
          count: { type: Number, default: 0 },
        },
      ],
      valid_until: {
        type: Date,
        default: Date.now,
      },
      userAgent: {type: String}, //source or device where user is accessing the token from.
      last_seen: {
          type: Date,
          default: Date.now,
      }, //last time user try to access the token
      secret_key: { type: String, require: true, default: "sk-ta-783267310998082f6323837"}, //sk-ta-783267310998082f6323837g
      public_key: { type: String, require: true, default: "sk-ta-40583267310998082f6323837"}, //pk-ta-783267310998082f6323837g
      created_at: {
        type: Date,
        default: Date.now,
      },
      updated_at: Date,
      deleted_at: Date,
    },
    {
      usePushEach: true,
    }
  );

  sessionAuthSchema.index({ _id: 1, type: -1 });

module.exports = mongoose.model('SessionAuth', sessionAuthSchema);
