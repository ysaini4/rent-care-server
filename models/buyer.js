const Joi = require("joi");
const mongoose = require("mongoose");

const Buyer = mongoose.model(
  "Buyer",
  new mongoose.Schema({
    pId: { type: String, index: true },
    Name: String,
    Email: String,
    Mobile: String,
    "Company Name": String,
    "Reference Name": String,
    Designation: String,
    Date: Date
  })
);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

exports.Buyer = Buyer;
exports.validate = validateCustomer;
