import { Router } from 'express';

import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { validateRequest } from '../../middlewares';
import * as BlogHandlers from './blogs.handlers';
import { Blog } from './blogs.model';

const router = Router();

router.get('/', BlogHandlers.findAll);
router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  BlogHandlers.findOne,
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  BlogHandlers.deleteOne,
);
router.post(
  '/',
  validateRequest({
    body: Blog,
  }),
  BlogHandlers.createOne,
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Blog,
  }),
  BlogHandlers.updateOne,
);

export default router;
