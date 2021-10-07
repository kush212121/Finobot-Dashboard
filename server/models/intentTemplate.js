import mongoose from "mongoose";

const IntentTemplateSchema = mongoose.Schema({
  type: { type: String, required: true, default: "test" },
  intentName: { type: String, required: true, unique: true },
  responses: [{ type: String, required: true }],
  isMulti: { type: Boolean, required: true },
  multiIntents: [
    { type: mongoose.Schema.Types.ObjectId, ref: "MultiIntentTemplate" },
  ],
});

const MultiIntentTemplateSchema = mongoose.Schema({
  intentName: { type: String, required: true, unique: true },
  responses: [{ type: String, required: true }],
});

const IntentTemplate = mongoose.model("IntentTemplate", IntentTemplateSchema);

export const MultiIntentTemplate = mongoose.model(
  "MultiIntentTemplate",
  MultiIntentTemplateSchema
);

export default IntentTemplate;
