import express from "express";

//Models
import {
  getAllCustomers,
  createCustomer,
  getCustomer,
} from "../controllers/customers.js";

//Middleware
import auth from "../middleware/auth.js";

const router = express.Router();

//@route POST /customers
//@desc  POST all customers
// router.post("/:id", getCustomer);

//@route GET /customers
//@desc  Get all customers
router.get("/:id", getAllCustomers);

//@route POST /customers
//@desc  POST all customers
router.post("/", createCustomer);

//@route GET /customers
//@desc  Get all customers
router.get("/one/:id", getCustomer);

export default router;
