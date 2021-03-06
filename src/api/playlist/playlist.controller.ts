import express from 'express';
import { playlistService } from './playlist.service';

export const playlistController = {
  getPlaylists,
  getPlaylist,
  addPlaylist,
  updatePlaylist,
  removePlaylist,
  getPlayingSongPlaylist,
};

// GET LIST
async function getPlaylists(req: express.Request, res: express.Response) {
  try {
    const playlists = await playlistService.query();
    res.send(playlists);
  } catch (err) {
    console.error('err, playlist.controller -> getPlaylists():', err.message);
    throw err;
  }
}
// GET SINGLE
async function getPlaylist(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const { playlist, playlistSongs }: any = await playlistService.query({
      id,
    });
    res.status(200).send({ playlist, playlistSongs });
  } catch (err) {
    console.error('err, playlist.controller -> getPlaylist():', err.message);

    throw err;
  }
}
// CREATE
async function addPlaylist(req: express.Request, res: express.Response) {
  try {
    const { name, description, img, genre, created_by } = req.body;

    const newPlaylist = await playlistService.create({
      name,
      description,
      img,
      genre,
      created_by,
    });
    res.send(newPlaylist);
  } catch (err) {
    console.error('err, playlist.controller -> addPlaylist():', err.message);
    throw err;
  }
}
// UPDATE
async function updatePlaylist(req: express.Request, res: express.Response) {
  try {
    const updatedPlaylist = await playlistService.update(req.body);
    res.send(updatedPlaylist);
  } catch (err) {
    console.error('err, playlist.controller -> updatePlaylist():', err.message);

    throw err;
  }
}

// DELETE
async function removePlaylist(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    await playlistService.remove({ id });
    res.send();
  } catch (err) {
    console.error('err, playlist.controller -> removePlaylist():', err.message);

    throw err;
  }
}
async function getPlayingSongPlaylist(
  req: express.Request,
  res: express.Response
) {
  try {
    const { songUrl } = req.params;
    res.send(await playlistService.getPlayingSongPlaylist(songUrl));
  } catch (err) {
    console.error('err, playlist.controller -> removePlaylist():', err.message);

    throw err;
  }
}
