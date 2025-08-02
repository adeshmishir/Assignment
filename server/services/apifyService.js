import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
const BASE_URL = process.env.APIFY_API_BASE_URL;
console.log("BASE_URL:", BASE_URL);


const getAuthHeader = (apiKey) => ({
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export const fetchUserActors = async (apiKey) => {
  const res = await axios.get(`${BASE_URL}/acts`, getAuthHeader(apiKey));
  return res.data;
};


export const fetchActorSchema = async (actorId, apiKey) => {
  const res = await axios.get(`${BASE_URL}/acts/${actorId}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });
  return res.data?.inputSchema || {};
};



export const executeActor = async (actorId, input, apiKey) => {
  const res = await axios.post(
    `${BASE_URL}/acts/${actorId}/runs?waitForFinish=1`,
    input,
    getAuthHeader(apiKey)
  );
  return res.data;
};
