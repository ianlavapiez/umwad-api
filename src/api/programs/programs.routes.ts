import { Router } from 'express';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { validateRequest } from '../../middlewares';
import * as ProgramHandlers from './programs.handlers';
import { Program } from './programs.model';

const router = Router();

router.get('/', ProgramHandlers.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  ProgramHandlers.findOne,
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  ProgramHandlers.deleteOne,
);
router.post(
  '/',
  validateRequest({
    body: Program,
  }),
  ProgramHandlers.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Program,
  }),
  ProgramHandlers.updateOne,
);

export default router;
