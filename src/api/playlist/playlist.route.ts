import express from 'express';
import { playlistController } from './playlist.controller.js';

const {
  getPlaylists,
  getPlaylist,
  addPlaylist,
  updatePlaylist,
  removePlaylist,
  getPlayingSongPlaylist,
} = playlistController;

const router = express.Router();

router.get('/', getPlaylists);
router.get('/getPlaylist/:id', getPlaylist);
router.get('/checkIfSongExists/:songUrl', getPlayingSongPlaylist);
router.put('/:id', updatePlaylist);
router.post('/', addPlaylist);
router.delete('/:id', removePlaylist);
export const playlistRoutes = router;
