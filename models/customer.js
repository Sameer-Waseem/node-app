const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 255 },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
  });

  const { error } = schema.validate(genre);
  return error;
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
