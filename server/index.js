import express from "express";
import cors from "cors";
import { Server as socketio } from "socket.io";
import http from "http";

//Routes
import regOrgRoutes from "./routes/regOrgs.js";
import orgsRoutes from "./routes/orgs.js";
import agentRoutes from "./routes/agents.js";
import customerRoutes from "./routes/customers.js";
import verifyLoginRoutes from "./routes/verifyLogin.js";
import adminRoutes from "./routes/admin.js";
import intentTemplateRoutes from "./routes/intentTemplate.js";

//utils
import connectDB from "./config/db.js";
import sock from "./config/socket.js";

//Connect Database
connectDB();

// init
const app = express();
const server = http.createServer(app);

//Middleware
app.use(express.json({ limit: "30MB", extended: true }));
app.use(express.urlencoded({ limit: "30MB", extended: true }));
app.use(cors());

//Middleware Routes
app.use("/regOrgs", regOrgRoutes);
app.use("/orgs", orgsRoutes);
app.use("/agents", agentRoutes);
app.use("/customers", customerRoutes);
app.use("/verify-login", verifyLoginRoutes);
app.use("/admin", adminRoutes);
app.use("/intent-templates", intentTemplateRoutes);

//config
const io = new socketio(server, {
  cors: {
    origin: "*",
    // origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//Socketio
sock(io);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  return res.send("Finnobot api...");
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}...`);
});
