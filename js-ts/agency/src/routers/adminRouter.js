const express = require("express");

const {
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../views/admin/crud");

const router = express.Router();

router.route("/getAll/").get(getAdmins);
router.route("/get/").get(getAdmin);
router.route("/update/").post(updateAdmin);
router.route("/delete/").get(deleteAdmin);

module.exports = router;
