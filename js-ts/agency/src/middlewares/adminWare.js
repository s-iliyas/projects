const encrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "asldhaiudhuieqwjdbnjkasnx";
const jwtExpireTime = "60000";

const verifyAdmin = async (req, res, next) => {
  const token =
    req.query.token || req.body.token || req.headers["x-access-token"];
  if (!token) {
    res.status(400).json({ message: "Invalid Operation" });
  } else {
    try {
      const decoded_token = await jwt.decode(token, secret);
      if (!decoded_token) {
        res.status(400).json({ message: "Invalid token" });
      } else {
        const time_diff = Number(
          (((Date.now() / 1000) | 0) - decoded_token.exp) * 1000
        );
        console.log(time_diff);
        if (Number(jwtExpireTime) > time_diff) {
          req.user = decoded_token;
          return next();
        } else {
          res.status(400).json({ message: "Token Expired" });
        }
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = { verifyAdmin };
