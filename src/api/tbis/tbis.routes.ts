import { Router } from 'express';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { validateRequest } from '../../middlewares';
import * as TBIHandlers from './tbis.handlers';
import { TBI } from './tbis.model';

const router = Router();

router.get('/', TBIHandlers.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  TBIHandlers.findOne,
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  TBIHandlers.deleteOne,
);
router.post(
  '/',
  validateRequest({
    body: TBI,
  }),
  TBIHandlers.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: TBI,
  }),
  TBIHandlers.updateOne,
);

export default router;
