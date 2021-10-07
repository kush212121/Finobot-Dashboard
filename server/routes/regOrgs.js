import express from "express";
const router = express.Router();

//RegOrgs
import {
  getRegOrgs,
  createRegOrg,
  updateRegOrg,
  deleteRegOrg,
} from "../controllers/regOrgs.js";

import auth from "../middleware/auth.js";

//@route GET /regOrgs
//@desc Get All Registered Orgs
router.get("/", auth, getRegOrgs);

//@route POST /regOrgs
//@desc Create New Registered Org
router.post("/register", createRegOrg);

//@route PATCH /regOrgs
//@desc Update Registered Org
router.patch("/update/:id", updateRegOrg);

//@route DELETE /regOrgs
//@desc Delte Registered Org
router.delete("/delete/:id", auth, deleteRegOrg);

export default router;
