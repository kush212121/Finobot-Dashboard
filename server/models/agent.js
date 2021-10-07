import mongoose from "mongoose";

const AgentSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 6, immutable: true },
  orgId: { type: mongoose.Schema.Types.ObjectId, ref: "Org", required: true },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  role: {
    type: String,
    required: true,
    immutable: true,
    default: "agent",
  },
});

const Agent = mongoose.model("Agent", AgentSchema);

export default Agent;
