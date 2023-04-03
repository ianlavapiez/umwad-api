import { Request, Response, Router } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';

import * as AuthHandlers from './auth.handlers';
import config from '../../config/auth.config';

type User = {
  id?: number;
};

const router = Router();

passport.use(
  new Strategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: config.CLIENT_ID || '',
      clientSecret: config.CLIENT_SECRET || '',
    },
    AuthHandlers.verifyCallback,
  ),
);
passport.serializeUser((user: User, done) => {
  done(null, user.id);
});
passport.deserializeUser((id: number, done) => {
  done(null, id);
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email'],
  }),
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure',
    successRedirect: '/',
    session: true,
  }),
);
router.get('/failure', (req: Request, res: Response) => {
  return res.send('Failed to log in!');
});

router.get('/logout', (req: Request, res: Response) => {
  req.logOut(() => console.log('Logging out.'));

  return res.redirect('/');
});

export default router;
