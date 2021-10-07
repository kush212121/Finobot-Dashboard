import mongoose from "mongoose";

const regOrgSchema = mongoose.Schema({
  orgName: { type: String, required: true, min: 4, max: 300 },
  address: { type: String, required: true, min: 6, max: 1000 },
  directorName: { type: String, required: true, min: 6, max: 300 },
  email: { type: String, required: true },
  domainName: { type: String, required: true },
  firstNumber: { type: Number, required: true },
  secondNumber: { type: Number },
  isEmailSent: { type: Boolean, default: false },
});

const RegOrg = mongoose.model("RegOrg", regOrgSchema);

export default RegOrg;
