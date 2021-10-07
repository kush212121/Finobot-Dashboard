import Agent from "../models/agent.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Org from "../models/org.js";

//@route GET /agents
//@desc  Get all agents
export const getAgents = async (req, res) => {
  const { orgId } = req;

  if (!orgId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const agents = await Agent.find({ orgId });

    return res.status(200).json(agents);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

//@route POST /agents
//@desc  Create new agent
export const createAgent = async (req, res) => {
  const { body, orgId } = req;

  if (!orgId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const existingAgent = await Agent.findOne({
      email: body.email,
      orgId,
    }).populate("orgId");

    if (existingAgent)
      return res.status(400).json({ message: "Agent already exists" });

    const hashedPass = await bcrypt.hash(body.password, 12);

    const newAgent = new Agent({
      ...body,
      orgId,
      password: hashedPass,
      role: "agent",
    });

    await newAgent.save();

    const existingOrg = await Org.findById({ _id: orgId });
    existingOrg.agents.push(newAgent._id);

    await existingOrg.save();

    return res.status(201).json(newAgent);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

//@route POST /agents/updte/:id
//@desc  Update new agent
export const updateAgent = async (req, res) => {
  const { id: _id } = req.params;
  const { body, orgId } = req;

  if (!orgId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const updatedAgent = await Agent.findByIdAndUpdate(_id, body, {
      new: true,
    });

    if (!updatedAgent)
      return res.status(404).json({ message: "Agent Not Found" });

    return res.status(201).json(updatedAgent);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

//@route POST /agents/delete/:id
//@desc  Delete new agent
export const deleteAgent = async (req, res) => {
  const { id: _id } = req.params;
  const { orgId } = req;

  if (!orgId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const delAgent = await Agent.findByIdAndDelete(_id);

    if (!delAgent) {
      return res.status(404).json({ message: "Agent Not Found" });
    }

    return res.status(200).json(delAgent);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

//@route POST /agents/login
//@desc  Loin  agent
export const loginAgent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAgent = await Agent.findOne({ email }).populate("orgId");

    if (!existingAgent)
      return res.status(500).json({ message: "Invalid Credentials!" });

    const isPassCorrect = await bcrypt.compare(
      password,
      existingAgent.password
    );

    if (!isPassCorrect)
      return res.status(400).json({ message: "Invalid Credentials!" });

    const token = jwt.sign(
      { email: existingAgent.email, id: existingAgent._id, role: "agent" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ existingAgent, token });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message });
  }
};
