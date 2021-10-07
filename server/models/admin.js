import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "admin" },
});

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
