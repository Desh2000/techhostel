const GatePassModel = require("../models/GatePassModel");
const { findUser } = require("./authController");

const createGatePass = async (req, res) => {
    const { data } = req.body;
    const user = await findUser(req);

    const pass = new GatePassModel({
        description: data.description,
        user_id: user._id,
        start_date: data.start_date,
        end_date: data.end_date,
        state: "pending",
    });
    await pass.save().catch(err => {
        console.log(err)
    });
    res.status(200).send("Done");
}

const userGatePasses = async (req, res) => {
    const user = await findUser(req);
    const resp = await GatePassModel.find({ user_id: user._id });
    res.json(resp);
}

module.exports = {
    createGatePass,
    userGatePasses
} 