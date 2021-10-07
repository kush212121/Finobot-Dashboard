import axios from "axios";

// const ENDPOINT = "https://finnobot-node-back.fintract.co.uk";
const ENDPOINT =
  process.env.REACT_APP_ENDPOINT || "https://finnobot-node-back.fintract.co.uk";

// console.log({ ENDPOINT });

export const loginApprovedOrg = (data) =>
  axios.post(`${ENDPOINT}/orgs/login`, data);

export const loginAgent = (data) =>
  axios.post(`${ENDPOINT}/agents/login`, data);

export const loginAdmin = (data) => axios.post(`${ENDPOINT}/admin/login`, data);

export const loginUser = (data, type) =>
  axios.post(`${ENDPOINT}/${type}/login`, data);
