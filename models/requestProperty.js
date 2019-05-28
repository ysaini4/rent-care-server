const Joi = require("joi");
const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  MarkAsRead: Boolean,
  Publish: Boolean,
  ShowAtHome: Boolean,
  Property: String,
  PropertyFor: String,
  Ptype: String,
  Utype: String,
  Address: String,
  Name: String,
  "Company Name": String,
  "Reference Person": String,
  Designation: String,
  Email: String,
  State: String,
  District: String,
  City: String,
  Location: String,
  Floors: String,
  Facing: String,
  "Super Area": Number,
  "Carpet Area": Number,
  "Approx Area": Number,
  Budget: Number,
  Image: String,
  Having: String,
  Badrooms: String,
  Bathrooms: String,
  Balcony: String,
  "PG Name": String,
  "Refrance Person": String,
  "No of Rooms": String,
  "Single Sharing Rooms": String,
  "Double Sharing Rooms": String,
  "Triple Sharing Rooms": String,
  "Four Sharing Rooms": String,
  "Room Size": String,
  "Budget Only Rooms": Number,
  "Budget With All Meals": Number,
  "Hotel Name": String,
  "Hotel Type": String,
  "Restaurant Name": String,
  "Restaurant Type": String,
  Seatry: String,
  "Room Size": String,
  "Room Size": String,
  "Room Size": String,
  "Car Parking": Boolean,
  "Water 24hr": Boolean,
  "Police Station": Boolean,
  "Railway Station": Boolean,
  "Metro Station": Boolean,
  "Furnish Type": String,
  "Sky View": Boolean,
  "Pool View": Boolean,
  "Garden View": Boolean,
  "Parking View": Boolean,
  "Club House View": Boolean,
  "Main intrance Gate View": Boolean,
  "Outer Building View": Boolean,
  "Swiming Pool": Boolean,
  "Club House": Boolean,
  "Indoor Sports": Boolean,
  "Outdoor Sports": Boolean,
  Garden: Boolean,
  Temple: Boolean,
  "School:": Boolean,
  Hospital: Boolean,
  Gim: Boolean,
  Pool: Boolean,
  Sports: Boolean,
  Parking: Boolean,
  "Study Table": Boolean,
  Alram: Boolean,
  Locker: Boolean,
  Kitchen: Boolean,
  Bar: Boolean,
  "Banquet Hall": Boolean,
  Date: Date,
  "Available for": String
});

const RequestProperty = mongoose.model("Requestproperty", schema);

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

exports.RequestProperty = RequestProperty;
exports.validate = validateCustomer;
