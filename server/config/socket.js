import fetchBotResponse from "../api/fetchBotResponse.js";

import {
  getAvailAgents,
  addNewAgent,
  rmAgent,
  rmCustomer,
  addCustomerToAgent,
} from "../controllers/socketController.js";
import Org from "../models/org.js";

export default (io) => {
  io.on("connection", (socket) => {
    // console.log({ headers: socket.request.headers });

    const originURL = socket.request.headers.origin;

    console.log({ originURL });

    let foundOrg;

    (async () => {
      foundOrg = await Org.findOne({ domainName: originURL });
      console.log({ foundOrg });
    })();

    //Join
    socket.on("join", ({ userName, isAgent, agentId, orgOrigin }, cb) => {
      // console.log(`${userName} has joined the chat!`);

      if (isAgent) {
        addNewAgent({
          agentName: userName,
          agentId,
          agentSocId: socket.id,
          originURL: orgOrigin,
        });
      }

      // cb({ error: "No error found" });
    });

    //Messages
    socket.on("message", ({ text, customerSocId, agentSocId }, cb) => {
      // const message = new Message({text, agent:  });

      // console.log({ msgsLeft: foundOrg.messagesLeft });
      if (foundOrg?.messagesLeft > 0) {
        (async () => {
          foundOrg.messagesLeft--;
          await foundOrg.save();

          console.log({ msgLeft: foundOrg.messagesLeft });

          if (foundOrg.messagesLeft < 1000)
            io.to(socket.id).emit("plan-over", {
              message:
                "Your plan is about to get over! Less than 1000 messages left",
            });
        })();
      } else {
        socket.disconnect();
      }

      if (!agentSocId) {
        fetchBotResponse(text)
          .then((res) => {
            // console.log({ res });
            const tag = res.tag === "true";
            const isMulti = res.is_multi === "true";
            const options = res.options;
            const agents = getAvailAgents(originURL);
            if (isMulti) return cb({ text: res.reply, tag, options });

            if (tag)
              if (!agents.length) {
                console.log({ noagents: agents });
                return cb({ text: "No agents available", tag: false });
              } else {
                addCustomerToAgent(customerSocId, agents[0].agentSocId);
                io.to(agents[0].agentSocId).emit("customer-connect", {
                  message: "Customer connected",
                  customerSocId,
                });
                return cb({
                  text: res.reply,
                  tag,
                  agentSocId: agents[0].agentSocId,
                  agentName: agents[0].agentName,
                });
              }
            else {
              return cb({ text: res.reply, tag });
            }
          })
          .catch((err) => cb({ err }));
      } else {
        io.to(agentSocId).emit("message", {
          text,
          sender: customerSocId,
        });
      }
    });

    //Agent messages
    socket.on("agent-message", ({ text, customerSocId }, cb) => {
      io.to(customerSocId).emit("message", {
        text,
        sender: "agent",
      });
    });

    //Disconnect
    socket.on("disconnect", () => {
      const agent = rmAgent(socket.id);
      if (agent?.customerSocId)
        io.to(agent.customerSocId).emit("agent-disconnect", {
          message: "Agent Disconnected",
        });
      const agentCus = rmCustomer(socket.id);
      if (agentCus)
        io.to(agentCus.agentSocId).emit("customer-disconnect", {
          message: "Customer Disconnected",
        });
    });
  });
};
