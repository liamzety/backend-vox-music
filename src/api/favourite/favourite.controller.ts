import { favouriteService } from './favourite.service';
import express from 'express';
import { playlistService } from '../playlist/playlist.service';

export const favouriteController = {
  getFavouritePlaylist,
  addFavouritePlaylist,
  unFavouritePlaylist,
};
// GET
async function getFavouritePlaylist(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.params;
    const favouritePlaylistsIdsFound = await favouriteService.getFavouritePlaylist(
      id
    );
    const favouritePlaylistsFound = await playlistService.query({
      favouritePlaylistsIdsFound,
    });
    res.status(200).send(favouritePlaylistsFound);
  } catch (err) {
    console.error(
      'err, favourite.controller -> getFavouritePlaylist():',
      err.message
    );
    res.status(400).send({ err, message: err.message });
  }
}
// ADD
async function addFavouritePlaylist(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.params;
    const { playlist_id } = req.body;
    await favouriteService.favouritePlaylist(id, playlist_id);
    res.status(200).end();
  } catch (err) {
    console.error(
      'err, favourite.controller -> addFavouritePlaylist():',
      err.message
    );
    res.status(400).send({ err, message: err.message });
  }
}
// REMOVE
async function unFavouritePlaylist(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.params;
    const { playlist_id } = req.body;
    await favouriteService.unFavouritePlaylist(id, playlist_id);
    res.status(200).end();
  } catch (err) {
    console.error(
      'err, favourite.controller -> unFavouritePlaylist():',
      err.message
    );
    res.status(400).send({ err, message: err.message });
  }
}
