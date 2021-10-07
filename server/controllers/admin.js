import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//@route GET /admin/all
//@desc  Get all agents
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});

    return res.status(200).json(admins);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

//@route POST /admin/create
//@desc  Create new admin
export const createAdmin = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPass = await bcrypt.hash(password, 12);

    const newAdmin = new Admin({
      email,
      password: hashedPass,
      role: "admin",
    });

    await newAdmin.save();

    return res.status(201).json(newAdmin);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

//@desc login for Approved Org
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin)
      return res.status(500).json({ message: "Invalid Credentials!" });

    const isPassCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!isPassCorrect)
      return res.status(500).json({ message: "Invalid Credentials!" });

    const token = jwt.sign(
      { email: existingAdmin.email, id: existingAdmin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );

    return res.status(200).json({ existingAdmin, token });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ message: error.message });
  }
};
