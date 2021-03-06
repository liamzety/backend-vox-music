import express from 'express';

export const requireAuthMiddleware = {
  requireAuth,
};

async function requireAuth(
  req: express.Request,
  res: express.Response,
  next: () => any
) {
  try {
    if (!req.session || !req.session.user) {
      throw { message: 'You need to be logged in.' };
    }
    next();
  } catch (err) {
    console.error(
      'Error, requireAuth.middleware.ts -> function: ',
      err.message
    );

    res.status(403).send({ message: err.message });
  }
}
