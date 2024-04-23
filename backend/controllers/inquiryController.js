const InquiryModel = require("../models/InquiryModel");
const { findUser } = require("./authController");

// Placeholder functions for submitting and getting inquiries
const submitInquiry = async (req, res) => {
  const { data } = req.body;
  const user = await findUser(req);

  // Perform validation checks
  if (!data.description) {
    return res.status(400).json({ error: 'Please provide a message for the inquiry' });
  }

  // Example: Save inquiry to a database
  const inquiry = new InquiryModel({
    description: data.description,
    user_id: user._id
  });
  await inquiry.save();
  res.status(200).json({ message: 'Inquiry submitted successfully' });
};

const getInquiries = async (req, res) => {
  const user = await findUser(req);
  const resp = await InquiryModel.find({ user_id: user._id });
  res.json(resp);
};

module.exports = {
  submitInquiry,
  getInquiries
};
