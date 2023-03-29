import { Router } from 'express';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { validateRequest } from '../../middlewares';
import * as PartnerHandlers from './partners.handlers';
import { Partner } from './partners.model';

const router = Router();

router.get('/', PartnerHandlers.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  PartnerHandlers.findOne,
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  PartnerHandlers.deleteOne,
);
router.post(
  '/',
  validateRequest({
    body: Partner,
  }),
  PartnerHandlers.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Partner,
  }),
  PartnerHandlers.updateOne,
);

export default router;
