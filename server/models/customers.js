import dotenv from "dotenv";
dotenv.config();
const db = process.env.MONGO_URL;

import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const connection = mongoose.createConnection(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

autoIncrement.initialize(connection);

const customersSchema = new mongoose.Schema({
  name: String,
  cusId: { type: String, unique: true },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  orgId: { type: mongoose.Schema.Types.ObjectId, ref: "Org" },
});

customersSchema.plugin(autoIncrement.plugin, {
  model: "Customer",
  field: "cusId",
});
const Customer = connection.model("Customer", customersSchema);
export default Customer;
