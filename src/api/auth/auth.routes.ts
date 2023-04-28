import { Request, Response, Router } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import * as AuthHandlers from './auth.handlers';
import config from '../../config/auth.config';

type User = {
  id?: number;
};

const router = Router();

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/callback',
      clientID: config.CLIENT_ID || '',
      clientSecret: config.CLIENT_SECRET || '',
    },
    AuthHandlers.verifyGoogleCallback,
  ),
);
passport.use(
  new FacebookStrategy(
    {
      callbackURL: '/auth/facebook/callback',
      clientID: config.FACEBOOK_CLIENT_ID || '',
      clientSecret: config.FACEBOOK_CLIENT_SECRET || '',
    },
    AuthHandlers.verifyFacebookCallback,
  ),
);
passport.serializeUser((user: User, done) => {
  done(null, user);
});
passport.deserializeUser((user: User, done) => {
  done(null, user);
});

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'profile'],
  }),
);
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/failure',
    successRedirect: process.env.CLIENT_URL,
    session: true,
  }),
);
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure',
    successRedirect: process.env.CLIENT_URL,
    session: true,
  }),
);
router.get('/failure', (req: Request, res: Response) => {
  return res.status(401).json({
    error: true,
    message: 'Login failed. Please try again.',
  });
});

router.get('/login/success', (req: Request, res: Response) => {
  if (req.user) {
    return res.status(200).json({
      error: false,
      message: 'Successfully logged in.',
      user: req.user,
    });
  } else {
    return res.status(403).json({
      error: true,
      message: 'Not authorized.',
    });
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.logOut(() => console.log('Logging out.'));

  return res.redirect('/');
});

export default router;
