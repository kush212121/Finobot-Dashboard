import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import Org from "../models/org.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.userEmail = decodedData?.email;
      req.orgId = decodedData?.id;
      req.role = decodedData?.role;

      if (req.orgId) {
        const org = await Org.findById(req.orgId);

        if (org) {
          const { apiCallsLeft } = org;
          if (apiCallsLeft > 0) {
            org.apiCallsLeft = apiCallsLeft - 1;
            await org.save();
            console.log({ apiCallsLeft: org.apiCallsLeft });
          } else {
            return res
              .status(403)
              .json({ message: "Your api plan has expired" });
          }
        }
      }

      const admin = await Admin.findOne({ email: req.userEmail });

      if (admin) req.isAdmin = true;
    }

    next();
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ message: error.message });
  }
};

export default auth;
