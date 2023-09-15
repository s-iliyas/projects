const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.get("/nutrition", async (req, res) => {
  const { input } = req.query;
  await axios
    .get(
      "https://www.myfitnesspal.com/api/nutrition",
      {
        params: {
          query: input,
        },
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((resp) => res.status(200).json(resp.data))
    .catch((err) => res.status(400).json(err.mesage));
});

app.listen(8000);
