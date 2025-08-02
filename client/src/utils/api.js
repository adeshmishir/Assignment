import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

export const fetchActors = (apiKey) => {
  return API.get('/actors', {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
};

export const fetchActorInputSchema = (actorId, apiKey) => {
  return API.get(`/actors/${actorId}/input-schema`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
};

export const runActor = (actorId, inputData, apiKey) => {
  return API.post(`/actors/${actorId}/run`, inputData, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
};
