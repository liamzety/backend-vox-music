import express from 'express';
import { favouriteController } from './favourite.controller';

const router = express.Router();

const {
  getFavouritePlaylist,
  addFavouritePlaylist,
  unFavouritePlaylist,
} = favouriteController;

router.get('/user_playlists/:id', getFavouritePlaylist);
router.delete('/user_playlists/:id', unFavouritePlaylist);
router.post('/user_playlists/:id', addFavouritePlaylist);

export const favouriteRoutes = router;
