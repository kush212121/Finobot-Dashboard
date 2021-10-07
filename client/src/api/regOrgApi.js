import axios from "axios";

// const ENDPOINT = "https://finnobot-node-back.fintract.co.uk";
const ENDPOINT =
  process.env.REACT_APP_ENDPOINT || "https://finnobot-node-back.fintract.co.uk";

export const registerOrg = (data) =>
  axios.post(`${ENDPOINT}/regOrgs/register`, data);

export const getAllRegOrgs = (type) => axios.get(`${ENDPOINT}/${type}`);

//Approved Orgs
export const setPass = (data, orgId) =>
  axios.post(`${ENDPOINT}/orgs/set-pass/${orgId}`, data);

export const sendMail = (data) =>
  axios.post(`${ENDPOINT}/orgs/send-mail`, data);

export const updateOrg = (data) => axios.patch(`${ENDPOINT}/orgs/update`, data);

export const deleteOrg = (orgId, type) =>
  axios.delete(`${ENDPOINT}/${type}/delete/${orgId}`);

// Agents
export const getAllAgents = () => axios.get(`${ENDPOINT}/agents`);

export const createAgent = (data) =>
  axios.post(`${ENDPOINT}/agents/create`, data);

export const deleteAgent = (agentId) =>
  axios.delete(`${ENDPOINT}/agents/delete/${agentId}`);

export const updateAgent = (agentId, data) =>
  axios.patch(`${ENDPOINT}/agents/update/${agentId}`, data);

export const getAllCustomers = (orgId) =>
  axios.get(`${ENDPOINT}/customers/${orgId}`);

export const getAllIntents = () => axios.get(`${ENDPOINT}/orgs/intents`);

export const updateIntent = (intentId, intentName, responses, multiIntents) =>
  axios.patch(`${ENDPOINT}/orgs/intents`, {
    intentId,
    intentName,
    responses,
    multiIntents,
  });

export const createCustomIntent = (data) =>
  axios.post(`${ENDPOINT}/orgs/intents`, data);

export const deleteIntent = (intentName) =>
  axios.delete(`${ENDPOINT}/orgs/intents/${intentName}`);

export const approveIntent = (intentName) =>
  axios.patch(`${ENDPOINT}/orgs/approve-intents/${intentName}`);
