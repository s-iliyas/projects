const { Agent } = require("../../models/agentModel");

const createAgent = async (req, res) => {
  const { full_name, email, phone_number, address } = req.body;
  if (!(full_name && email && phone_number && address)) {
    res.status(400).json({ message: "All fields are required" });
  } else {
    const agent = await new Agent({
      full_name: full_name,
      email: email,
      phone_number: phone_number,
      address: address,
    });
    agent
      .save()
      .then(() => {
        res.status(200).json({ message: "Agent created" });
      })
      .catch((error) => {
        res.status(400).json({ message: error.message });
      });
  }
};

const getAgents = async (req, res) => {
  const agents = Agent.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};

const getAgent = async (req, res) => {
  const agent = Agent.findOne({ email: req.query.email })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};
const updateAgent = async (req, res) => {
  const agent = Agent.updateOne({ email: req.query.email }, req.body)
    .then(() => {
      res.status(200).json({ message: "Agent Updated" });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};
const deleteAgent = async (req, res) => {
  const agent = Agent.deleteOne({ email: req.query.email })
    .then(() => {
      res.status(200).json({ message: "Agent deleted" });
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};
module.exports = { createAgent, getAgents, getAgent, updateAgent, deleteAgent };
