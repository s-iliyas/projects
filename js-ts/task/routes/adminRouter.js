const express = require("express");

const { adminLogin, adminSignup, getAgent, createAgent, updateAgent, deleteAgent } = require("../controllers/admin/controller");

const verifyAdmin = require("../middlewares/adminware");

const router = express.Router();

router.route("/signup/").post(adminSignup);
router.route("/login/").post(adminLogin);
router.route("/get/agents/").get(verifyAdmin, getAgent)
router.route("/create/agents/").post(verifyAdmin, createAgent);
router.route("/update/agents/").post(verifyAdmin, updateAgent);
router.route("/delete/agents/").delete(verifyAdmin, deleteAgent);

module.exports = router
