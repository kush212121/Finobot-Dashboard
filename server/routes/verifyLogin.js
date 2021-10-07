import express from "express";
const router = express.Router();

//Models
import auth from "../middleware/auth.js";
import Admin from "../models/admin.js";
import Agent from "../models/agent.js";
import Org from "../models/org.js";

//@route POST /orgs
//@desc POST All Approved Orgs
router.post("/", auth, async (req, res) => {
  const { userEmail, role } = req;
  if (!role || !userEmail)
    return res.status(401).json({ message: "Unauthorized" });

  try {
    if (role === "admin") {
      const admin = await Admin.findOne({ email: userEmail }).select(
        "-password"
      );
      if (admin) return res.status(200).json(admin);
      else return res.status(401).json({ message: "Unauthorized" });
    } else if (role === "org") {
      const org = await Org.findOne({ email: userEmail }).select("-password");
      if (org) return res.status(200).json(org);
      else return res.status(401).json({ message: "Unauthorized" });
    } else if (role === "agent") {
      const agent = await Agent.findOne({ email: userEmail })
        .select("-password")
        .populate("orgId");
      if (agent) return res.status(200).json(agent);
      else return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(409).json({ message: error.message });
  }
});

export default router;
