const mongoose = require("mongoose");
const userModel = mongoose.Schema({
  FullName: { type: String, required: true },
  PassingYear: { type: Number, required: true },
  RoleNumber: { type: String, required: true },
  Email: { type: String, required: true },
});
exports.User = mongoose.model("User", userModel);
