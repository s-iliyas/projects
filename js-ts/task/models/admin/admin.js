const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../db/sqconnector");

class Admin extends Model {};

Admin.init({
    first_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isAlpha: {
                msg: " First name should contain only alphabets. "
            }
        }
    }, last_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isAlpha: {
                msg: " Last name should contain only alphabets. "
            }
        }
    }, email: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isEmail: {
                msg: " Invalid Email Format. "
            }
        }
    }, phone_number: {
        type: DataTypes.TEXT,
        allowNull: true,
    }, password: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true,
        noUpdate: true
    }, token: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, { sequelize });


module.exports = Admin;