import { Router } from 'express';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { validateRequest } from '../../middlewares';
import * as CommunityHandlers from './communities.handlers';
import { Community } from './communities.model';

const router = Router();

router.get('/', CommunityHandlers.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  CommunityHandlers.findOne,
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  CommunityHandlers.deleteOne,
);
router.post(
  '/',
  validateRequest({
    body: Community,
  }),
  CommunityHandlers.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Community,
  }),
  CommunityHandlers.updateOne,
);

export default router;
