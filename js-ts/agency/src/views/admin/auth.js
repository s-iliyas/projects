const { Admin } = require("../../models/adminModel");

const encrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const secret = "asldhaiudhuieqwjdbnjkasnx";

const jwtExpireTime = "1000";

const adminSignup = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    address,
    password1,
    password2,
  } = req.body;
  if (
    !(
      first_name &&
      last_name &&
      email &&
      phone_number &&
      address &&
      password1 &&
      password2
    )
  ) {
    res.status(400).json({ message: "All fields are required" });
  } else {
    const oldAdmin = await Admin.findOne({ email: email });
    if (oldAdmin) {
      res.status(400).json({ message: "Admin already exists." });
    } else {
      if (password1 === password2) {
        encryptedPassword = await encrypt.hash(password1, 10);
        const admin = await new Admin({
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone_number: phone_number,
          address: address,
          password: encryptedPassword,
        });
        admin
          .save()
          .then(() => {
            access_token = jwt.sign(
              { user_email: email, token_type: "access" },
              secret,
              { expiresIn: jwtExpireTime.concat("ms") }
            );
            admin.token = access_token;
            admin.save();
            res
              .status(200)
              .json({ token_object: { type: "access", token: access_token } });
          })
          .catch((err) => {
            res.status(400).json({ message: err.message });
          });
      } else {
        res.status(400).json({ message: "Passwords does not match." });
      }
    }
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).json({ message: "Fill all fields" });
  } else {
    const admin = await Admin.findOne({ email: email })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
    console.log(admin);
    if (admin && (await encrypt.compare(password, admin.password))) {
      const token = await jwt.sign(
        { user_email: email, toke_type: "access" },
        secret,
        { expiresIn: jwtExpireTime.concat("ms") }
      );
      admin.token = token;
      admin.save();
      res.status(200).json({ token: token, type: "access" });
    } else {
      res.status(200).json({ message: "Invalid credentials" });
    }
  }
};

module.exports = { adminSignup, adminLogin };
