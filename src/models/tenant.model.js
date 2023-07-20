"use strict";

const mongoose = require("mongoose");

  const tenantSchema = new mongoose.Schema(
    {
      name: {
        type: String,
      },
      slug: { type: String },
      user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      staff: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      phone_number: {
        type: String,
      },
      address: String,
      email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      },
      logo_url: { type: String, default: null },
      prefix_initial: { type: String, unique: true }, //TA
      tenantInfo: {
        subdomain: { type: String, unique: true },
        db_name: { type: String, unique: true, require: true },
        db_username: { type: String, require: true },
        db_password: { type: String, require: true },
        db_url: { type: String, require: true },
      },
      apiToken: [
        {
          type: [mongoose.Schema.Types.ObjectId],
          ref: "ApiAccessToken",
        },
      ],
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

  module.exports = mongoose.model('Tenant', tenantSchema )