import { pool } from '../../db.js';
export const favouriteService = {
  favouritePlaylist,
  getFavouritePlaylist,
  unFavouritePlaylist,
};

const PLAYLIST_FAVOURITES_TABLE = 'user_playlists';

async function getFavouritePlaylist(id: string) {
  try {
    const favouritePlaylistsIdsFound = await pool.query(
      `  SELECT * FROM ${PLAYLIST_FAVOURITES_TABLE} WHERE user_id=$1`,
      [id]
    );
    return favouritePlaylistsIdsFound.rows;
  } catch (err) {
    console.error(
      'err, favourite.service -> favouritePlaylist():',
      err.message
    );
    throw { message: 'Could not add to favourites.' };
  }
}
async function favouritePlaylist(id: string, playlist_id: string) {
  try {
    await pool.query(
      `  INSERT INTO ${PLAYLIST_FAVOURITES_TABLE} 
            (user_id,playlist_id) VALUES ($1,$2) `,
      [id, playlist_id]
    );
    return Promise.resolve();
  } catch (err) {
    console.error(
      'err, favourite.service -> favouritePlaylist():',
      err.message
    );
    throw { message: 'Could not add to favourites.' };
  }
}
async function unFavouritePlaylist(id: string, playlist_id: string) {
  try {
    await pool.query(
      `  DELETE FROM  ${PLAYLIST_FAVOURITES_TABLE} 
           WHERE playlist_id=$1 AND user_id=$2 `,
      [playlist_id, id]
    );
    return Promise.resolve();
  } catch (err) {
    console.error(
      'err, favourite.service -> unFavouritePlaylist():',
      err.message
    );
    throw { message: 'Could not unfavourite playlist.' };
  }
}
