const crypto = require("crypto");
const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name!"],
    },

    email: {
      type: String,
      required: [true, "Please provide a email address."],
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    photo: String,

    password: {
      type: String,
      required: [true, "Please provide a password."],
      minLength: 4,
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, "Confirm your password"],
      validate: {
        validator: function (confirmPassword) {
          return confirmPassword === this.password;
        },
        message: "Password and passwordConfirm should be the same!",
      },
    },

    passwordChangedAt: Date,

    passwordResetToken: String,

    passwordResetTokenExpires: Date,

    role: {
      type: String,
      enum: {
        values: ["user", "guide", "admin"],
        message: "Values can either: user, guide or admin!",
      },
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password" || this.isNew)) return next();

  // substracting 1s because sometimes JWT is created even before the document is created
  this.passwordChangedAt = Date.now() - 1000;
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.verifyPassword = async (password, inputPassword) => {
  return await bcrypt.compare(password, inputPassword);
};

userSchema.methods.changedPasswordAfterToken = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangeTimestamp = parseInt(
      passwordChangedAt.getTime() / 1000,
      10
    );

    return jwtTimestamp < passwordChangeTimestamp;
  }
};

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = model("User", userSchema);

module.exports = User;
