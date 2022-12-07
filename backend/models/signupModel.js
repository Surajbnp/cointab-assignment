const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
  email: {type : String, require : true},
  password: {type : String, require : true},
  maxAttempt : String,
  blockedTill : String
});

const SignupModel = mongoose.model("user", signupSchema);

module.exports = SignupModel;