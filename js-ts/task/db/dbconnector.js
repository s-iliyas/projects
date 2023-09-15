const { Client } = require("pg");

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "todo"
});

const startDB = async () => {
    try {
        let db_code;
        await client.connect().then(() => { console.log("Database connected"); db_code = 1 });
        return { database_code: db_code }
    } catch (error) {
        return { database_code: 0, err_object: { error_msg: error.message, message: "Above error occured when trying to connect Database" } }
    }
}

module.exports = startDB