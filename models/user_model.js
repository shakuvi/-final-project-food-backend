const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    email: { type: String },
    dateOfBirth: { type: String },
    mobileNumber: { type: String },
    password: { type: String },
  },
  { collection: "users" }
);

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  const staffMember = this;
  if (!staffMember.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(staffMember.password, 10);
    staffMember.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

// Compare the provided password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = model("User", userSchema);
