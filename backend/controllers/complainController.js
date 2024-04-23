const ComplainModel = require("../models/ComplainModel");
const { findUser } = require("./authController");

const createComplain = async (req, res) => {
    const { data } = req.body;
    const user = await findUser(req);
    const newComplain = new ComplainModel({
        subject: data.subject,
        description: data.description,
        user_id: user._id
    });
    await newComplain.save().catch(err => {
        console.log(err)
    });
    res.status(200).send("Done");
}

const getUserComplains = async (req, res) => {
    const user = await findUser(req);
    const complains = await ComplainModel.find({ user_id: user._id });
    res.json(complains);
}

module.exports = {
    createComplain,
    getUserComplains
} 