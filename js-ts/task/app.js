const express = require('express')

const morgan = require('morgan')

const app = express();

require("dotenv").config();

const admin = require("./routes/adminRouter");

const agent = require("./routes/agentRouter");

const startDB = require('./db/dbconnector');

const { startSequelizer } = require('./db/sequelizer');

app.use(morgan("dev"));

const PORT = process.env.NODE_PORT

app.use(express.json());

app.use("/admin",admin);

app.use("/agent", agent);

const server = async () => {
    db_code = await startDB();
    if (db_code.database_code === 1) {
        seq_code = await startSequelizer();
        if (seq_code.sequelizer_code === 0) {
            console.log(seq_code.err_object.error_msg);
            console.log(seq_code.err_object.message);
        } else if (seq_code.sequelizer_code === 1) {
            await app.listen(PORT, console.log(" ************************* Server listening on http://localhost:8000 ************************* "));
        }
    } else if (db_code.database_code === 0) {
        console.log(db_code.err_object.error_msg);
        console.log(db_code.err_object.message);
    };
}

server();

