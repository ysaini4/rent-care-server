const Joi = require("joi");
const mongoose = require("mongoose");

const Property = mongoose.model(
  "Property",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    phone: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    image: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150
    }
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

exports.Property = Property;
exports.validate = validateCustomer;
