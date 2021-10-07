import mongoose from "mongoose";

const IntentSchema = mongoose.Schema({
  intentName: { type: String, required: true },
  responses: [{ type: String, required: true }],
  orgId: { type: mongoose.Schema.Types.ObjectId, ref: "Org " },
  isMulti: { type: Boolean, required: true },
  multiIntents: [{ type: mongoose.Schema.Types.ObjectId, ref: "MultiIntent" }],
  isCustom: { type: Boolean, required: true, default: false },
  isApproved: { type: Boolean, required: true, default: false },
});

const MultiIntentSchema = mongoose.Schema({
  intentName: { type: String, required: true },
  responses: [{ type: String, required: true }],
  orgId: { type: mongoose.Schema.Types.ObjectId, ref: "Org " },
  isCustom: { type: Boolean, required: true, default: false },
  isApproved: { type: Boolean, required: true, default: false },
});

const Intent = mongoose.model("Intent", IntentSchema);

export const MultiIntent = mongoose.model("MultiIntent", MultiIntentSchema);

export default Intent;
