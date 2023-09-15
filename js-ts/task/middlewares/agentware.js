const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const secret = process.env.SECRET_KEY

const access_token_expire_time = process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME

const verifyAgent = (req, res, next) => {
    const jwt_token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!jwt_token) {
        res.status(400).json({ message: "No token to authorize" });
    } else {
        try {
            const decoded = jwt.decode(jwt_token, secret);
            if (!decoded) {
                res.status(400).json({ message: "Invalid token" });
            } else {
                const time_diff = String(((Date.now() / 1000 | 0) - decoded.exp) * 1000)
                if (access_token_expire_time > time_diff) {
                    req.user = decoded;
                    return next();
                } else {
                    res.status(400).json({ message: "Token Expired" });
                }
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = verifyAgent;

