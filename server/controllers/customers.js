import Agent from "../models/agent.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Org from "../models/org.js";
import Customer from "../models/customers.js";

//@route GET /agents
//@desc  Get all agents
export const getAllCustomers = async (req, res) => {
  const { id: orgId } = req.params;

  if (!orgId) {
    return res.status(400).json({ message: "Invalid Params" });
  }

  console.log({ orgId });

  try {
    const customers = await Customer.find({ orgId });

    return res.status(200).json(customers);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

//@route GET /customers
//@desc  GET  customer
export const getCustomer = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const existingCustomer = await Customer.findOne({ _id });

    if (!existingCustomer)
      return res.status(404).json({ message: "No customer found" });

    return res.status(200).json(existingCustomer);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message });
  }
};

//@route POST /customers
//@desc  Create new customer
export const createCustomer = async (req, res) => {
  const { orgId } = req.body;
  try {
    console.log({ orgId });

    const existingOrg = await Org.find({ _id: orgId });

    if (!existingOrg) return res.status(401).json({ message: "Unauthorized" });

    const newCustomer = new Customer({ orgId });

    await newCustomer.save();

    return res.status(201).json(newCustomer);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message });
  }
};
