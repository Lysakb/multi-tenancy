const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tenantApiTokenSchema = new Schema({
      organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
      },
      secret_key: { type: String,}, //sk-ta-783267310998082f6323837g
      public_key: { type: String,}, //pk-ta-783267310998082f6323837g
      token_hash: { type: String,}, //rehash of public_api_key
      host: String, // whitelist domain name
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

  tenantApiTokenSchema.index({ _id: 1, type: -1 });

  module.exports = mongoose.model('ApiAccessToken', tenantApiTokenSchema)