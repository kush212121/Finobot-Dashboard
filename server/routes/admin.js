import express from "express";

//Models
import { createAdmin, getAdmins, loginAdmin } from "../controllers/admin.js";

//Middleware
import auth from "../middleware/auth.js";

const router = express.Router();

//@route POST /admin/login
//@desc  Loin  agent
router.post("/create", createAdmin);

//@route POST /admin/all
//@desc  Loin  agent
router.get("/all", getAdmins);

//@route POST /admin/login
//@desc  Loin  agent
router.post("/login", loginAdmin);

export default router;
