import express from 'express';
import { playlistController } from './playlist.controller.js';

const {
  getPlaylists,
  getPlaylist,
  addPlaylist,
  updatePlaylist,
  removePlaylist,
} = playlistController;

const router = express.Router();

router.get('/', getPlaylists);
router.get('/:id', getPlaylist);
router.put('/:id', updatePlaylist);
router.post('/', addPlaylist);
router.delete('/:id', removePlaylist);
export const playlistRoutes = router;
