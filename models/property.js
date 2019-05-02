const Joi = require("joi");
const mongoose = require("mongoose");

const Property = mongoose.model(
  "Property",
  new mongoose.Schema({
    MarkAsRead: Boolean,
    Publish: Boolean,
    ShowAtHome: Boolean,
    Property: String,
    Ptype: String,
    Name: String,
    "Company Name": String,
    "Refrance Name": String,
    Designation: String,
    Email: String,
    State: String,
    District: String,
    City: String,
    Location: String,
    Floor: String,
    Facing: String,
    "Super Area": String,
    "Carpet Area": String,
    "Approx Area": String,
    Budget: String,
    Image: String,
    Having: String,
    Badrooms: String,
    Bathrooms: String,
    Balcony: String,
    "PG Name": String,
    "Refrance Person": String,
    "No.of Rooms": String,
    "Single Sharing Rooms": String,
    "Double Sharing Rooms": String,
    "Triple Sharing Rooms": String,
    "Four Sharing Rooms": String,
    "Room Size": String,
    "Budget Only Rooms": String,
    "Budget With All Meals": String,
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

exports.Property = Property;
exports.validate = validateCustomer;
