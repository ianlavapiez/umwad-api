import { Router } from 'express';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { validateRequest } from '../../middlewares';
import * as StartupHandlers from './startups.handlers';
import { Startup } from './startups.model';

const router = Router();

router.get('/', StartupHandlers.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  StartupHandlers.findOne,
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  StartupHandlers.deleteOne,
);
router.post(
  '/',
  validateRequest({
    body: Startup,
  }),
  StartupHandlers.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Startup,
  }),
  StartupHandlers.updateOne,
);

export default router;
