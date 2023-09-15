const Admin = require("../../models/admin/admin");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { Agent } = require("../../models/agent/agent");

const secret = process.env.SECRET_KEY;

const access_token_expire_time = process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME;

const adminSignup = async (req, res) => {
    try {
        let { first_name, last_name, password, phone_number, email } = req.body
        if (!(first_name && last_name && phone_number && email && password)) {
            res.status(400).json({ message: " Fill all fields" });
        } else {
            const oldAdmin = await Admin.findOne({ where: { email: email } }).catch((error) => { res.status(400).json({ message: error.message }); })
            if (oldAdmin) {
                res.status(400).json({ message: " You are already an Admin, Please login. " });
            } else {
                encryptedPassword = await bcrypt.hash(password, 10);
                const admin = await Admin.create({
                    first_name: first_name,
                    last_name: last_name,
                    phone_number: phone_number,
                    email: email,
                    password: encryptedPassword
                }).catch((error) => { return { code: 0, message: error.message } })
                if (admin.code === 0) {
                    res.status(400).json({ message: admin.message });
                } else {
                    const access_token = jwt.sign(
                        { user_id: admin.id, token_type: "access" },
                        secret,
                        { expiresIn: access_token_expire_time.concat("ms") }
                    );
                    admin.token = access_token;
                    admin.save();
                    res.status(200).json({ acces_token: admin.token });
                }
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const adminLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!(email && password)) {

            res.status(400).json({ message: "Fill all fields to login" });
        } else {
            const admin = await Admin.findOne({ where: { email: email } });
            if (admin && (await bcrypt.compare(password, admin.password))) {
                const access_token = jwt.sign(
                    { user_id: admin.id, token_type: "access" },
                    secret,
                    { expiresIn: access_token_expire_time.concat("ms") }
                );
                admin.token = access_token;
                admin.save();
                res.status(200).json({ acces_token: admin.token });
            } else {
                res.status(400).json({ message: "Invalid Credentials" });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createAgent = async (req, res) => {
    const { first_name, last_name, agent_email, phone_number } = req.body;
    const admin = await Admin.findOne({ where: { id: req.user.user_id } }).then((result) => { return result; })
    if (!(first_name && last_name && agent_email && phone_number)) {
        res.status(400).json({ message: "Fill all fields" });
    } else {
        const agent = await Agent.findOne({ where: { email: agent_email } }).then((result) => { return result; });
        if (agent) {
            res.status(400).json({ message: "Agent Already Exists" });
        } else {
            Agent.create({ first_name: first_name, last_name: last_name, email: agent_email, phone_number: phone_number, created_by: admin.email }).then((result) => { return result; });
            res.status(200).json({ message: "Agent created" });
        }
    }
}

const getAgent = async (req, res) => {
    const admin = await Admin.findOne({ where: { id: req.user.user_id } }).then((result) => { return result; });
    const agents = await Agent.findAll({ where: { created_by: admin.email } });
    res.status(200).json({
        agents: agents.map((agent) => {
            const { id, first_name, last_name, email, phone_number } = agent
            return { id, first_name, last_name, email, phone_number }
        })
    });
}

const updateAgent = async (req, res) => {
    const agent_id = req.query.id
    if (agent_id) {
        const agent = await Agent.findOne({ where: { id: agent_id } });
        if (req.body) {
            const update_agent = await agent.update(req.body)
                .then((result) => { const message = { result: result, code: 1 }; return message; })
                .catch((error) => { const message = { code: 0, err_msg: error.message }; return message; });
            if (update_agent.code === 1) {
                res.status(200).json({ message: "Updated agent" });
            } else if (update_agent.code === 0) {
                res.status(400).json({ message: update_agent.err_msg });
            }
        } else {
            res.status(200).json({ message: "No data to update" });
        }
    } else {
        res.status(400).json({ message: "Not valid agent,No agent id." });
    }
}

const deleteAgent = async (req, res) => {
    const agent_id = req.query.id
    if (agent_id) {
        const agent = await Agent.findOne({ where: { id: agent_id } });
        //hard delete (but for soft delete add active status boolean to agent and update it to false ,so when created set default to true. )
        const delete_agent = await agent.destroy()
            .then((result) => { const message = { result: result, code: 1 }; return message; })
            .catch((error) => { const message = { code: 0, err_msg: error.message }; return message; });
        if (delete_agent.code === 1) {
            res.status(200).json({ message: "Deleted agent" });
        } else if (delete_agent.code === 0) {
            res.status(400).json({ message: delete_agent.err_msg });
        };
    } else {
        res.status(400).json({ message: "Not valid agent,No agent id." });
    }
}




module.exports = {
    adminLogin,
    adminSignup,
    getAgent,
    createAgent,
    updateAgent,
    deleteAgent
}