const { Model, DataTypes } = require("sequelize");

const sequelize = require("../../db/sqconnector");


class Agent extends Model { }

Agent.init({
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
    }, access_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    }, created_by: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, { sequelize })


class AgentGoogleCredentials extends Model { }
AgentGoogleCredentials.init({
    email: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isEmail: {
                msg: " Invalid Email Format. "
            }
        }
    },
    access_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    id_token: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    scope: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    token_type: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    expiry_date: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, { sequelize })

class Client extends Model { }
Client.init({
    first_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isAlpha: {
                msg: "Should be all alphabets"
            }
        }
    }, last_name: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isAlpha: {
                msg: "Should be all alphabets"
            }
        }
    }, email: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isEmail: {
                msg: "Should be email format"
            }
        }
    }, task: {
        type: DataTypes.TEXT,
        allowNull: true,
    }, completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    created_by: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            isEmail: {
                msg: "Should be email format"
            }
        }
    }
}, { sequelize })

module.exports = { AgentGoogleCredentials, Agent, Client }