import mongoose from "mongoose";
import Intent, { MultiIntent } from "../models/intent.js";

//@route GET /orgs
//@desc get all intents
export const getAllIntents = async (req, res) => {
  const { orgId, isAdmin } = req;

  if (!orgId && !isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!mongoose.Types.ObjectId.isValid(orgId) && !isAdmin)
    return res.status(404).json({ message: "No Organization with that id" });

  try {
    if (isAdmin) {
      const intents = await Intent.find({ isCustom: true }).populate(
        "multiIntents"
      );
      return res.status(200).json(intents);
    }

    const intents = await Intent.find().populate("multiIntents");
    return res.status(200).json(intents);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//@route POST /orgs
//@desc Create New Intent
export const createIntent = async (req, res) => {
  const { orgId } = req;

  const { intentName, responses, isMulti, isCustom, isApproved } = req.body;

  if (!orgId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!mongoose.Types.ObjectId.isValid(orgId))
    return res.status(404).json({ message: "No Organization with that id" });

  try {
    const existingIntent = await Intent.findOne({ intentName });

    console.log({ existingIntent });

    if (existingIntent)
      return res.status(400).json({ message: "Intent already exists" });

    const newIntent = new Intent({
      intentName,
      responses,
      orgId,
      isMulti,
      isCustom,
      isApproved,
    });

    await newIntent.save();

    console.log({ newIntent });

    return res.status(201).json(newIntent);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//@route PATCH /orgs/intents
//@desc Create new  intents
export const updateIntent = async (req, res) => {
  const { orgId } = req;

  const { intentId, intentName, responses, multiIntents, isApproved } =
    req.body;

  if (!intentId) return res.status(400).json({ message: "Intent Id missing" });

  if (!orgId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!mongoose.Types.ObjectId.isValid(orgId))
    return res.status(404).json({ message: "No Organization with that id" });

  try {
    const multiIntentIds = [];
    // const updatedIntent = await Intent.findOneAndUpdate(
    //   { intentName, orgId },
    //   { responses },
    //   { new: true }
    // );
    // const deleteMultiIntents = await MultiIntent.deleteMany({ intentName });
    // const newMultiIntents = await MultiIntent.insertMany(multiIntents);

    // console.log({ deleteMultiIntents, newMultiIntents });

    if (!multiIntents) {
      const updatedIntent = await Intent.findOneAndUpdate(
        { _id: intentId },
        { intentName, responses, isApproved },
        { new: true }
      );

      return res.status(200).json(updatedIntent);
    }

    const foundIntent = await Intent.findOne({ intentName });

    //Delete Old multi intents
    for (let intentId of foundIntent.multiIntents) {
      console.log({ intentId });

      const delIntent = await MultiIntent.findByIdAndDelete(intentId);
      console.log({ delIntent });
    }

    //Add New Multi Intents
    for (let multiIntent of multiIntents) {
      console.log({ multiIntent });

      const { responses, intentName } = multiIntent;

      const newMultiIntent = new MultiIntent({
        responses,
        intentName: intentName.toLowerCase(),
      });
      await newMultiIntent.save();
      console.log({ newMultiIntent });
      multiIntentIds.push(newMultiIntent._id);
    }

    foundIntent.responses = multiIntents.map(({ intentName }) =>
      intentName.toLowerCase()
    );
    foundIntent.multiIntents = multiIntentIds;

    foundIntent.save();

    console.log({ foundIntent });
    return res.status(200).json(foundIntent);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteIntent = async (req, res) => {
  const { intentName } = req.params;

  if (!intentName) {
    return res.status(400).json({ message: "Missing Parameters" });
  }

  try {
    const deletedIntent = await Intent.findOneAndDelete({ intentName });

    console.log({ deletedIntent });

    return res.status(205).json(deletedIntent);
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message });
  }
};

export const approveIntent = async (req, res) => {
  const { isAdmin } = req;

  const { intentName } = req.params;

  if (!isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const approvedIntent = await Intent.findOneAndUpdate(
      { intentName },
      { isApproved: true }
    );

    return res.status(200).json(approvedIntent);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
