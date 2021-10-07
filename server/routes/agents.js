import express from "express";

//Models
import {
  createAgent,
  deleteAgent,
  getAgents,
  updateAgent,
  loginAgent,
} from "../controllers/agents.js";

//Middleware
import auth from "../middleware/auth.js";

const router = express.Router();

//@route GET /agents
//@desc  Get all agents
router.get("/", auth, getAgents);

//@route POST /agents/create/:id
//@desc  Create new agent
router.post("/create", auth, createAgent);

//@route POST /agents/delete/:id
//@desc  Delete new agent
router.delete("/delete/:id", auth, deleteAgent);

//@route PATCH /agents/update/:id
//@desc  Update new agent
router.patch("/update/:id", auth, updateAgent);

//@route POST /agents/login
//@desc  Loin  agent
router.post("/login", loginAgent);

export default router;
