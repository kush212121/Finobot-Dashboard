import axios from "axios";

const ENDPOINT =
  process.env.REACT_APP_ENDPOINT || "https://finnobot-node-back.fintract.co.uk"; // const ENDPOINT = "https://finnobot-node-back.fintract.co.uk";

export const verifyToken = async () => axios.post(`${ENDPOINT}/verify-login`);
