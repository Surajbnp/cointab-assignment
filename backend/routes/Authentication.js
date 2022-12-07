const { Router } = require("express");
const SignupModel = require("../models/signupModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 5;

let signupRoute = Router();

// signup route

signupRoute.post("/signup", async (req, res) => {
  let { email, password } = req.body;
  let maxAttempt = 5;

  let validEmail = await SignupModel.findOne({ email });
  if (validEmail !== null) {
    res.status(406).send({ msg: "email is allready used" });
  } else {
    // hash the password before storing in the dataBase using bcrypt

    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const data = SignupModel({
        email: email,
        password: hash,
        maxAttempt: maxAttempt,
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
  let totalattempt = Number(user.maxAttempt);
  let time = new Date();

  if (user) {
    const hash = user.password;
    let isValid = await bcrypt.compareSync(password, hash);
    if (isValid) {
      // genreating the random token after successfully login using JWT

      let token = jwt.sign({ userId: user._id }, process.env.SECRET);
      await SignupModel.updateOne(
        { email },
        { $set: { maxAttempt: 5, blockedTill: null } }
      );
      res.status(200).send({
        msg: "login successfully",
        useremail: user.email,
        token: token,
      });
    } else {
      if (totalattempt > 0) {
        await SignupModel.updateOne(
          { email },
          { $set: { maxAttempt: totalattempt - 1 } }
        );
        res
          .status(404)
          .send({ msg: "Invalid Credential", maxAttempt: totalattempt - 1 });
      } else {
        const timestamp = new Date().getTime();
        const date = new Date(timestamp);
        let today = date.toLocaleString("sv");
        date.setDate(date.getDate() + 1);
        let tommarow = date.toLocaleString("sv");

        // unblocking user after 24 Hours ends

        if (today === tommarow) {
          await SignupModel.updateOne(
            { email },
            { $set: { maxAttempt: 5, blockedTill: null } }
          );
        }

        // blocking user for 24 hours
        else {
          await SignupModel.updateOne(
            { email },
            { $set: { blockedTill: tommarow } }
          );
        }

        res.send({ msg: "user blocked", blockedTill: user.blockedTill });
      }
    }
  } else {
    res.status(404).send({ msg: "No user found" });
  }
});

module.exports = { signupRoute };
