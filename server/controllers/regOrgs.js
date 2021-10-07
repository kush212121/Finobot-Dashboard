import mongoose from "mongoose";

//models
import RegOrg from "../models/regOrg.js";
import Org from "../models/org.js";

//Validation
import { validateRegOrg } from "../utils/joiValidate.js";

//@route GET /regOrgs
//@desc Get All Registered Orgs
export const getRegOrgs = async (req, res) => {
  if (!req.isAdmin) return res.status(401).json({ message: "Unauthorized" });

  try {
    const regOrgs = await RegOrg.find();

    return res.status(200).json(regOrgs);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

//@route POST /regOrgs
//@desc Create New Registered Org
export const createRegOrg = async (req, res) => {
  const { body } = req;
  const { email, domainName } = body;

  const { error: validError } = validateRegOrg(body);

  //Joi Validation
  if (validError) {
    return res.status(400).send({ message: validError.details[0].message });
  }

  try {
    const existingOrg1 = await RegOrg.findOne({ email });
    const existingOrg2 = await Org.findOne({ email });
    const existingOrg3 = await Org.findOne({ domainName });

    if (existingOrg3)
      return res
        .status(400)
        .json({
          message:
            "Domain Name already registered, please choose a different domain name",
        });

    if (existingOrg1 || existingOrg2)
      return res.status(400).json({ message: "Org already registered" });

    const regOrg = new RegOrg(body);
    await regOrg.save();
    return res.status(201).json(regOrg);
  } catch (error) {
    console.log({ error });
    return res.status(409).json({ message: error.message });
  }
};

//@route PATCH /regOrgs
//@desc Update Registered Org
export const updateRegOrg = async (req, res) => {
  const { id: _id } = req.params;
  const { body: org } = req;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: "No Organization with that id" });

  try {
    const updatedOrg = await RegOrg.findByIdAndUpdate(_id, org, { new: true });

    return res.status(201).json(updatedOrg);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

//@route DELETE /regOrgs
//@desc Delte Registered Org
export const deleteRegOrg = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.isAdmin) return res.status(401).json({ message: "Unauthorized" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(500).json({ message: "No Organization with that id" });

  try {
    const deleteRegOrg = await RegOrg.findByIdAndDelete(_id);

    if (!deleteRegOrg)
      return res.status(500).json({ message: "Org Not Found" });

    return res.status(205).json(deleteRegOrg);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
