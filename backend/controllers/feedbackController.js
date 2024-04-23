const FeedbackModel = require("../models/FeedbackModel");
const { findUser } = require("./authController");

const createFeedback = async (req, res) => {
    const { data } = req.body;
    const user = await findUser(req);

    const feedback = new FeedbackModel({
        description: data.description,
        subject: data.subject,
        user_id: user._id,
        user_email: user.email
    });
    await feedback.save().catch(err => {
        console.log(err)
    });
    res.status(200).send("Done");
}

const userFeedbacks = async (req, res) => {
    const user = await findUser(req);
    const resp = await FeedbackModel.find({ user_id: user._id });
    res.json(resp);
}

const all = async (req, res) => {
    const resp = await FeedbackModel.find({});
    res.json(resp);
}

module.exports = {
    createFeedback,
    userFeedbacks,
    all
} 