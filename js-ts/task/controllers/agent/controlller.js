const { Client, Agent } = require("../../models/agent/agent");


const createClient = async (req, res) => {
    const agent = await Agent.findOne({ where: { id: req.user.user_id } });
    console.log(agent.email);
    const { first_name, last_name, email, task } = req.body
    if (!(first_name && last_name && email && task)) {
        res.status(400).json({ message: "Fill all fields" });
    } else {
        const oldclient = await Client.findOne({ where: { email: email } })
        if (!oldclient) {
            const client = await Client.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                task: task,
                created_by: agent.email
            }).then((result) => { return result; });
            res.status(200).json({ message: "Client Created" });
        } else {
            res.status(400).json({ message: "Client exist" });
        }
    }
}


const getClient = async (req, res) => {
    const agent = await Agent.findOne({ where: { id: req.user.user_id } });
    const clients = await Client.findAll({ where: { created_by: agent.email } })
    res.status(200).json({
        clients: clients.map(
            (a) => {
                const { id, first_name, last_name, email, task } = a;
                return { id, first_name, last_name, email, task };
            }
        )
    })
}

const updateClient = async (req, res) => {
    const client_id = req.query.id
    if (!client_id) {
        res.status(400).json(({ message: "No client ID" }))
    } else {
        const update_client = await Client.update(req.body)
            .then((result) => { const message = { result: result, code: 1 }; return message })
            .catch((err) => { const message = { code: 0, result: err.message }; return message });
        if (update_client.code === 1) {
            res.status(200).json({ message: "Updated Client" })
        } else {
            res.status(400).json({ message: update_client.result })
        }
    }
}

const deleteClient = async (req, res) => {
    const client_id = req.query.id;
    const client = await Client.findOne({ where: { id: client_id } });
    const delete_client = client.destroy()
        .then((result) => { const message = { result: result, code: 1 }; return message })
        .catch((err) => { const message = { code: 0, result: err.message }; return message });
    if (delete_client.code === 1) {
        res.status(200).json({ message: "Deleted Client" })
    } else {
        res.status(400).json({ message: delete_client.result })
    }
}




























module.exports = {
    createClient,
    getClient,
    updateClient,
    deleteClient
}