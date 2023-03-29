import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import blogs from './blogs/blogs.routes';
import communities from './communities/communities.routes';
import partners from './partners/partners.routes';
import programs from './programs/programs.routes';
import startups from './startups/startups.routes';
import tbis from './tbis/tbis.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/blogs', blogs);
router.use('/communities', communities);
router.use('/partners', partners);
router.use('/programs', programs);
router.use('/startups', startups);
router.use('/tbis', tbis);

export default router;
