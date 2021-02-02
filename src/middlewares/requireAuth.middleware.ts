import express from 'express';

export const requireAuthMiddleware = {
  requireAuth,
  requireAdmin,
};

async function requireAuth(
  req: express.Request,
  res: express.Response,
  next: () => any
) {
  if (!req.session || !req.session.user) {
    res.status(401).end('Unauthorized!');
    return;
  }
  next();
}

async function requireAdmin(
  req: express.Request,
  res: express.Response,
  next: () => any
) {
  const user = req.session.user;
  if (!user.isAdmin) {
    res.status(403).end('Unauthorized Enough..');
    return;
  }
  next();
}
