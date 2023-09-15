const express = require("express");

const morgan = require("morgan");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

const mongoose = require("mongoose");



const admin = require("./routers/adminRouter");

const { verifyAdmin } = require("./middlewares/adminWare");

app.use("/admin", verifyAdmin, admin);

const authSignup = require("./routers/signupRouter");

app.use("/auth/signup", authSignup);

const agent = require("./routers/agentRouter");

app.use("/agent", agent);

const authLogin = require("./routers/loginRouter");

app.use("/auth/login", authLogin);

const dbUrl =
  "mongodb+srv://iliyas:iliyas@agencydb.hdaek8r.mongodb.net/agencydb?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to db..");
    app.listen(
      PORT,
      console.log(
        "server listening at port 8080 , visit http://localhost:8080/home/ ................."
      )
    );
  })
  .catch((error) => {
    console.log(error.message);
  });

const PORT = 8000;
