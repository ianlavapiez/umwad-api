import cookieSession from 'cookie-session';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import config from './config/auth.config';
import auth from './api/auth/auth.routes';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(
  cors({
    credentials: true,
    methods: 'GET,POST,PUT,DELETE',
    origin: 'http://localhost:3000',
  }),
);
app.set('trust proxy', 1);
app.use(express.json());
app.use(
  cookieSession({
    keys: [config.COOKIE_KEY_1 || '', config.COOKIE_KEY_2 || ''],
    maxAge: 24 * 60 * 60 * 1000,
    name: 'session',
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get<{}, MessageResponse>('/', middlewares.checkedLoggedIn, (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/auth', auth);
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
