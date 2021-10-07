import express from "express";
import {
  createIntent,
  getAllIntents,
  updateIntent,
  deleteIntent,
  approveIntent,
} from "../controllers/intent.js";
const router = express.Router();

//Controllers
import {
  deleteOrg,
  getOrgs,
  setPass,
  loginOrg,
  sendOrgMail,
  updateOrg,
} from "../controllers/orgs.js";
import auth from "../middleware/auth.js";

//@route GET /orgs
//@desc Get All Approved Orgs
router.get("/", auth, getOrgs);

//@route POST /orgs
//@desc login for Approved Org
router.post("/login", loginOrg);

//@route POST /orgs
//@desc Approve Org
router.post("/set-pass/:id", setPass);

//@route POST /orgs/sendMail
//@desc Send Mail to Specific Org
router.post("/send-mail", auth, sendOrgMail);

//@route PATCH /orgs/update/:id
//@desc Update Approved Org
router.patch("/update/", auth, updateOrg);

//@route DELETE /orgs
//@desc Delete Approved Org
router.delete("/delete/:id", auth, deleteOrg);

//@route GET /orgs/intents
//@desc get all intents
router.get("/intents", auth, getAllIntents);

//@route POST /orgs/intents
//@desc Create new  intents
router.post("/intents", auth, createIntent);

//@route PATCH /orgs/intents
//@desc UPdate   intents
router.patch("/intents", auth, updateIntent);

//@route PATCH /orgs/intents
//@desc UPdate   intents
router.patch("/approve-intents/:intentName", auth, approveIntent);

//@route PATCH /orgs/intents
//@desc UPdate   intents
router.delete("/intents/:intentName", auth, deleteIntent);

export default router;
