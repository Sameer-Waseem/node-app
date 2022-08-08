const express = require("express");
const { Customer, validate } = require("../models/customer");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).send(customers);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send("Customer not found");
    return res.status(200).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const response = validate(req.body);
    if (response) return res.status(400).send(response.details[0].message);

    let customer = new Customer(req.body);
    customer = await customer.save();

    res.status(200).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const response = validate(req.body);
    if (response) return res.status(400).send(response.details[0].message);

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!customer) res.status(404).send("Customer not found");
    return res.status(200).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) res.status(404).send("Customer not found");
    return res.status(200).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
