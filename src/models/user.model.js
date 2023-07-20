const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { BCRYPT_SALT } = require("../config/env");
const { hashPassword, comparePassword, generateSalt } = require("../utils/user");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
    },

    name: {
      type: String,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },

    phoneNumber: {
      type: String,
    },

    companyName: {
      type: String,
    },

    companySize: {
      type: Number,
    },

    password: {
      type: String,
    },
    accessToken: { type: String },
    refreshAccessToken: { type: String },
    googleId: {
      type: String,
    },
    googleAccessToken: String,
    verifyToken: String,

    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordExpiresAt: Date,

    role: {
      type: String,
      default: "user",
      enum: ["superAdmin", "admin", "user"],
    },

    sessionAuth: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SessionAuth",
    },

    deletedAt: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await generateSalt(Number(BCRYPT_SALT));
  const hash = await hashPassword(user.password, salt);

  user.password = hash;
  user.reEnterPassword = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await comparePassword(user.password, password);

  return compare;
};

module.exports = mongoose.model("User", userSchema);
