import express from 'express';
import {
  getUserActors,
  getActorInputSchema,
  runActorOnce
} from '../controllers/actorController.js';
import protectRoute from '../middleware/protectRoute.js'; 

const router = express.Router();


router.get('/', protectRoute, getUserActors);
router.get('/:actorId/schema', protectRoute, getActorInputSchema);
router.post('/:actorId/run', protectRoute, runActorOnce);

export default router;
