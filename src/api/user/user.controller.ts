import { userService } from './user.service.js';
import express from 'express';

export const userController = {
  addUser,
  removeUser,
  updateUser,
  getUser,
};

// GET
async function getUser(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const user = await userService.query({ id });
    res.status(200).send(user);
  } catch (err) {
    console.error('err, user.controller -> getUser():', err.message);
    res.status(400).send({ err, message: 'Something went wrong.' });
  }
}
// CREATE
async function addUser(req: express.Request, res: express.Response) {
  try {
    const newUser = await userService.add(req.body);
    res.status(200).send(newUser);
  } catch (err) {
    console.error('err, user.controller -> addUser():', err.message);
    res.status(400).send({ err, message: 'Something went wrong.' });
  }
}

// DELETE
async function removeUser(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    await userService.remove(id);
    res.status(200).send('User Deleted Succusfully');
  } catch (err) {
    console.error('err, user.controller -> removeUser():', err.message);
    res.status(400).send({ err, message: 'Something went wrong.' });
  }
}

// UPDATE
async function updateUser(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const user = req.body;
    const userUpdated = await userService.update(id, user);
    res.status(200).send(userUpdated);
  } catch (err) {
    console.error('err, user.controller -> updateUser():', err.message);
    res.status(400).send({ err, message: 'Something went wrong.' });
  }
}
