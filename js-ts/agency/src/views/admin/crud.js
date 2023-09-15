const { Admin } = require("../../models/adminModel");

const getAdmins = async (req, res) => {
  const admins = await Admin.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getAdmin = async (req, res) => {
  const admin = await Admin.findOne({ email: req.query.email })
    .then((result) => {
      if (result === null) {
        res.status(400).json({ message: `No Admin with ${req.query.email}` });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

const updateAdmin = async (req, res) => {
  const req_data = req.body;
  const filter = { email: req.query.email };
  const admin = await Admin.updateOne(filter, req_data)
    .then(() => {
      res.status(200).json({ message: "Admin Updated" });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};

const deleteAdmin = async (req, res) => {
  const admin = Admin.deleteOne({ email: req.query.email })
    .then(() => {
      res.status(200).json({ message: "Admin deleted" });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};
module.exports = { getAdmins, getAdmin, updateAdmin, deleteAdmin };
