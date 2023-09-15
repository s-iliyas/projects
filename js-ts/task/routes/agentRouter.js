const express = require("express");
const router = express.Router();

const verifyAgent = require("../middlewares/agentware")
const {
    googleLogin,
    googleRedirect
} = require("../controllers/agent/google");

const {
    createClient,
    getClient,
    updateClient,
    deleteClient
} = require("../controllers/agent/controlller");



router.route("/login").get(googleLogin);
router.route("/login/redirect").get(googleRedirect);
router.route("/get/clients").get(verifyAgent, getClient);
router.route("/update/clients").post(verifyAgent, updateClient);
router.route("/create/clients").post(verifyAgent, createClient);
router.route("/delete/clients").delete(verifyAgent, deleteClient);










module.exports = router