import express from 'express';
import { authService } from './auth.service';

export const authController = {
  login,
  signup,
  logout,
};

async function login(req: express.Request, res: express.Response) {
  try {
    const user = await authService.login(req.body);
    req.session.user = user;
    console.log('auth.controller -> req.session.user', req.session.user);
    res.status(200).send(user);
  } catch (err) {
    console.error('err, auth.controller -> login():', err.message);

    res
      .status(401)
      .send(
        { message: err.message } || { err, message: 'Something went wrong.' }
      );
  }
}

async function signup(req: express.Request, res: express.Response) {
  try {
    await authService.signup(req.body);
    const user = await authService.login(req.body);
    req.session.user = user;
    res.status(200).send(user);
  } catch (err) {
    console.error('err, auth.controller -> signup():', err.message);

    res
      .status(500)
      .send(
        { message: err.message } || { err, message: 'Something went wrong.' }
      );
  }
}
async function logout(req: express.Request, res: express.Response) {
  try {
    req.session.destroy((err) => {
      if (err) console.log('err', err);
    });
    res.status(200).send('Logged out successfully');
  } catch (err) {
    console.error('err, auth.controller -> logout():', err.message);

    res.status(500).send({ err, message: 'Something went wrong.' });
  }
}
