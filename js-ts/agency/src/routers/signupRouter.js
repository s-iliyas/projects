const { adminSignup } = require("../views/admin/auth");

const express = require("express");

const router = express.Router();

router.route("/admin/").post(adminSignup);

module.exports = router;
