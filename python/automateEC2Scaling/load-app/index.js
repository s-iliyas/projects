const morgan = require("morgan");
const fs = require("fs");
const util = require("util");
const path = require("path");
const express = require("express");
const readFileAsync = util.promisify(fs.readFile);

const app = express();
const port = 8000;

app.use(morgan("dev"));

app.get("/", async function (req, res) {
  try {
    const fileReadPromises = [];
    for (let i = 0; i < 5000; i++) {
      const readFilePromise = readFileAsync(
        path.resolve() + "/data.json",
        "utf8"
      );
      fileReadPromises.push(readFilePromise);
    }

    const data = await Promise.all(fileReadPromises);
    const jsonData = data.map((jsonString) => JSON.parse(jsonString));

    res.json({ message: "Success!", data: jsonData });
  } catch (error) {
    res.status(500).json({ message: "Error!", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
