import express from 'express';
import { requireAuthMiddleware } from '../../middlewares/requireAuth.middleware';
import { playlistController } from './playlist.controller.js';

const { requireAuth } = requireAuthMiddleware;
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
router.put('/:id', requireAuth, updatePlaylist);
router.post('/', requireAuth, addPlaylist);
router.delete('/:id', requireAuth, removePlaylist);
export const playlistRoutes = router;
