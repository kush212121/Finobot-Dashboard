let agents = [];
// const agents = [
//   {
//     agentId: "agent1id",
//     agentName: "agent 1",
//     customer: "",
//     orgId //@TODO
//   },
// ];

export const addNewAgent = (agent) => {
  agents.push(agent);
  console.log({ agents });
};

export const getAvailAgents = (_originURL) => {
  console.log({ getAgents: agents });
  return agents.filter(
    ({ customerSocId, originURL }) => !customerSocId && originURL === _originURL
  );
};

export const rmAgent = (agentSocId) => {
  const agent = agents.find((aObj) => aObj.agentSocId === agentSocId);
  agents = agents.filter((aObj) => aObj !== agent);
  console.log({ agents });
  return agent;
};

export const rmCustomer = (customerSocId) => {
  const agent = agents.find((aObj) => aObj.customerSocId == customerSocId);
  if (agent) {
    const upAgent = {
      agentName: agent.agentName,
      agentId: agent.agentId,
      agentSocId: agent.agentSocId,
    };
    agents = [...agents.filter((aObj) => aObj !== agent), upAgent];
  }
  console.log({ agents });
  return agent;
};

export const addCustomerToAgent = (customerSocId, agentSocId) => {
  let agent = agents.find((aObj) => aObj.agentSocId === agentSocId);
  agent.customerSocId = customerSocId;

  agents = [...agents.filter((aObj) => aObj !== agent), agent];
  console.log({ agents });
};
