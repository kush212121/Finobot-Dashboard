import mongoose from "mongoose";

const OrgSchema = mongoose.Schema({
  orgName: { type: String, required: true, min: 4, max: 300 },
  address: { type: String, required: true, min: 6, max: 1000 },
  directorName: { type: String, required: true, min: 6, max: 300 },
  email: { type: String, required: true },
  domainName: { type: String, required: true },
  password: { type: String, required: true, min: 6 },
  firstNumber: { type: Number, required: true },
  secondNumber: { type: Number },
  orgDP: String,
  role: {
    type: String,
    required: true,
    immutable: true,
    default: "org",
  },
  agents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Agent" }],
  apiCallsLeft: { type: Number, default: 10000 },
  messagesLeft: { type: Number, default: 10000 },
});

const Org = mongoose.model("Org", OrgSchema);

export default Org;
