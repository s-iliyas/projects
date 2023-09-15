const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const agentSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    }
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", agentSchema);

module.exports = { Agent };
