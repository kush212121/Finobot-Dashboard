import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//Models
import Org from "../models/org.js";
import RegOrg from "../models/regOrg.js";
import sendMail from "../config/nodemailer.js";

//@route GET /orgs
//@desc Get All Approved Orgs
export const getOrgs = async (req, res) => {
  if (!req.isAdmin) return res.status(401).json({ message: "Unauthorized" });

  try {
    const orgs = await Org.find({ role: "org" })
      .populate("agents")
      .select("-password -__v");
    return res.status(200).json(orgs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//@route POST /orgs/login
//@desc login for Approved Org
export const loginOrg = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingOrg = await Org.findOne({ email });

    if (!existingOrg)
      return res.status(404).json({ message: "Invalid Credentials!" });

    const isPassCorrect = await bcrypt.compare(password, existingOrg.password);

    if (!isPassCorrect)
      return res.status(400).json({ message: "Invalid Credentials!" });

    const token = jwt.sign(
      { email: existingOrg.email, id: existingOrg._id, role: "org" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ existingOrg, token });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message });
  }
};

//@route POST /orgs
//@desc Set Pass for Approved Org
export const setPass = async (req, res) => {
  const { password } = req.body;
  const { id: orgId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orgId))
    return res.status(404).json({ message: "No Organization with that id" });

  try {
    if (!password)
      return res.status(400).json({ message: "Invalid Parameters" });

    const existingOrg = await Org.findOne({ _id: orgId });
    if (existingOrg)
      return res.status(400).json({ message: "Org already exists" });

    const regOrg = await RegOrg.findOne({ _id: orgId }).select("-_id -__v");
    if (!regOrg) return res.status(400).json({ message: "Org Not Registered" });

    const hashedPass = await bcrypt.hash(password, 12);

    //Add Org Reg DB to Approved Org DB
    const result = await Org.create({
      ...regOrg.toObject(),
      password: hashedPass,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id, role: "org" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // const token = jwt.sign(
    //   { email: existingOrg.email, id: existingOrg._id, role: "org" },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" }
    // );

    //Delete Org From Reg Orgs after Approving
    await RegOrg.findOneAndDelete({ email: regOrg.email });

    return res.status(200).json({ result, token });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message });
  }
};

//@route POST /orgs/sendMail
//@desc Send Mail to Specific Org
export const sendOrgMail = async (req, res) => {
  const { email, orgId } = req.body;
  if (!req.isAdmin) return res.status(401).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(orgId))
    return res.status(404).json({ message: "No Organization with that id" });

  try {
    let regOrg = await RegOrg.findOne({ _id: orgId });

    if (!regOrg) return res.status(404).json({ message: "Org Not Found" });

    regOrg.isEmailSent = true;

    regOrg.save();

    await sendMail(process.env.EMAIL, email, orgId);
    return res.status(200).json({ message: "Mail Sent!", email });
    // return res.status(200).json({ regOrg });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//@route PATCH /orgs/update/:id
//@desc Update Approved Org
export const updateOrg = async (req, res) => {
  const { orgId: _id, isAdmin } = req;
  const { body: org } = req;
  const { _id: orgId } = req.body;

  console.log({ org, _id });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "No Organization with that id" });

  try {
    let updatedOrg;

    if (isAdmin)
      updatedOrg = await Org.findByIdAndUpdate(orgId, org, { new: true });
    else updatedOrg = await Org.findByIdAndUpdate(_id, org, { new: true });

    console.log({ updatedOrg });

    return res.status(201).json(updatedOrg);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

//@route DELETE /orgs
//@desc Delete Approved Org
export const deleteOrg = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.isAdmin) return res.status(401).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "No Organization with that id" });

  try {
    const delOrg = await Org.findByIdAndDelete(_id);

    console.log({ delOrg });
    if (!delOrg)
      return res.status(404).json({ message: "No Organization with that id" });

    return res.status(205).json(delOrg);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
