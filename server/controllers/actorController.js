import {
  fetchUserActors,
  fetchActorSchema,
  executeActor
} from '../services/apifyService.js';
import handleError from '../utils/handleError.js';


export const getUserActors = async (req, res) => {
  try {
    const bearerToken = req.headers['authorization'];
    const apiKey = bearerToken?.split(' ')[1];

    const actors = await fetchUserActors(apiKey);
    res.json(actors);
  } catch (error) {
    
    handleError(res, error);
  }
};


export const getActorInputSchema = async (req, res) => {
  try {
    const bearerToken = req.headers['authorization'];
    const apiKey = bearerToken?.split(' ')[1];

    const { actorId } = req.params;
    const schema = await fetchActorSchema(actorId, apiKey);
    res.json(schema);
  } catch (error) {
    handleError(res, error);
  }
};


export const runActorOnce = async (req, res) => {
  try {
    const bearerToken = req.headers['authorization'];
    const apiKey = bearerToken?.split(' ')[1];

    const { actorId } = req.params;
    const input = req.body;
    const runResult = await executeActor(actorId, input, apiKey);
    res.json(runResult);
  } catch (error) {
    handleError(res, error);
  }
};
