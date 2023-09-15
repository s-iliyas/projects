const {
  createAgent,
  getAgents,
  getAgent,
  updateAgent,
  deleteAgent,
} = require("../views/agents/crud");

const express = require("express");

const router = express.Router();

router.route("/create/").post(createAgent);
router.route("/getAll/").get(getAgents);
router.route("/get/").get(getAgent);
router.route("/update/").post(updateAgent);
router.route("/delete/").get(deleteAgent);

module.exports = router;
