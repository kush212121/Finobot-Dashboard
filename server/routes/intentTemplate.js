import express from "express";

//Models
import {
  getIntentTemplate,
  createIntentTemplate,
} from "../controllers/intentTemplate.js";

//Middleware
import auth from "../middleware/auth.js";

const router = express.Router();

//@route GET /intent-templates
//@desc  Get all intent-templates
router.get("/", auth, getIntentTemplate);

//@route POST /intent-templates/create/:id
//@desc  Create new agent
router.post("/", auth, createIntentTemplate);

//@route POST /agents/delete/:id
//@desc  Delete new agent
// router.delete("/delete/:id", auth, deleteAgent);

//@route PATCH /agents/update/:id
//@desc  Update new agent
// router.patch("/update/:id", auth, updateAgent);

export default router;
