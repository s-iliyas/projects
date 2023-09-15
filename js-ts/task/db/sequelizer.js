const sequelize = require("./sqconnector");



const startSequelizer = async () => {
    let seq_code;
    try {
        await sequelize.authenticate().then(async () => {
            seq_code = 1; console.log("Sequelize app started");
            const db = await sequelize.sync({ force: false, alter: true })
                .then(() => { console.log("Database sync success"); })
                .catch((error) => { console.log(`Database sync error=${error.message}`); })
            
        });
        return { sequelizer_code: seq_code }
    } catch (error) {
        return { sequelizer_code: 0, err_object: { error_msg: error.message, message: "Above error occured when trying to connect sequelize app to Database" } }
    }
}

module.exports = { startSequelizer, sequelize }
