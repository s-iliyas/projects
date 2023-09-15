const express = require("express");

const { adminLogin } = require("../views/admin/auth");

const router = express.Router();

router.route("/admin/").post(adminLogin);

module.exports = router;
