import express from 'express';
import { songService } from './song.service.js';

export const songController = {
  addSong,
  removeSong,
};

// CREATE
async function addSong(req: express.Request, res: express.Response) {
  try {
    const newSong = await songService.add(req.body);
    res.status(200).send(newSong);
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err);
  }
}

// DELETE
async function removeSong(req: express.Request, res: express.Response) {
  const { id } = req.params;
  try {
    await songService.remove({ id });
    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err);
  }
}
