const { Router } = require("express");
const SignupModel = require("../models/signupModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 5;

let signupRoute = Router();


// signup route

signupRoute.post("/signup", async (req, res) => {
  let {email, password } = req.body;

  let validEmail = await SignupModel.findOne({ email });
  if (validEmail !== null) {
    res.status(406).send({ msg: "email is allready used" });
  } else {

    // hash the password before storing in the dataBase using bcrypt

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const data = SignupModel({
        email: email,
        password: hash,
      });
      try {
        await data.save();
        res.status(200).send({ msg: "signup seccessfully" });
      } catch (err) {
        console.log(err);
      }
    });
  }
});

// Login route

signupRoute.post("/login", async (req, res) => {
  let { email, password } = req.body;
  const user = await SignupModel.findOne({ email });
  if (user) {
    const hash = user.password;
    let isValid = await bcrypt.compareSync(password, hash);
    if (isValid) {

      // genreating the random token after successfully login using JWT 

      let token = jwt.sign({ userId: user._id }, process.env.SECRET);
      res.status(200).send({ msg: "login successfully", useremail : user.email ,token: token});
    } else {
      res.status(404).send({ msg: "Invalid Credential" });
    }
  } else {
    res.status(404).send({ msg: "Invalid Credential" });
  }
});

module.exports = { signupRoute };
