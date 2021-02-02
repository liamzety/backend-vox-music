import { pool } from '../../db.js';

export const playlistService = {
  query,
  create,
  update,
  remove,
};

const PLAYLIST_TABLE = 'playlist';
const SONG_TABLE = 'song';

async function query(filterBy?: { id?: string }) {
  try {
    if (filterBy) {
      const { id } = filterBy;
      let playlist = await pool.query(
        `
        SELECT * FROM ${PLAYLIST_TABLE}
         WHERE _id = $1
         `,
        [id]
      );
      let playlistSongs: any = await pool.query(
        `
        SELECT * FROM ${SONG_TABLE}
         WHERE playlist_id = $1
         `,
        [id]
      );
      playlist = playlist.rows[0];
      playlistSongs = playlistSongs.rows;

      return { playlist, playlistSongs };
    } else {
      const playlists = await pool.query(`SELECT * FROM ${PLAYLIST_TABLE}`);
      return playlists.rows;
    }
  } catch (err) {
    console.error('err, playlist.service -> query():', err.message);
    throw { message: 'Could not find playlist/s.' };
  }
}
async function create(playlistData: {
  name: string;
  description: string;
  img: string;
  genre: string;
}) {
  const { name, description, img, genre } = playlistData;
  try {
    const newPlaylist = await pool.query(
      `
              INSERT INTO ${PLAYLIST_TABLE} 
              (name,description,img,genre) VALUES ($1,$2,$3,$4) RETURNING *`,
      [name, description, img, genre]
    );
    return newPlaylist.rows[0];
  } catch (err) {
    console.error('err, playlist.service -> create():', err.message);
    throw { message: 'Could not create playlist.' };
  }
}
async function update(query: { id: string; name: string }) {
  const { id, name } = query;
  try {
    const updatedPlaylist = await pool.query(
      `
              UPDATE ${PLAYLIST_TABLE} SET name = $1
              WHERE _id = $2 RETURNING *
              `,
      [name, id]
    );

    return updatedPlaylist.rows[0];
  } catch (err) {
    console.error('err, playlist.service -> update():', err.message);
    throw { message: 'Could not update playlist.' };
  }
}
async function remove(query: { id: string }) {
  const { id } = query;
  try {
    await pool.query(
      `
              DELETE FROM ${PLAYLIST_TABLE} WHERE _id=$1;
              `,
      [id]
    );

    return;
  } catch (err) {
    console.error('err, playlist.service -> remove():', err.message);
    throw { message: 'Could not remove playlist.' };
  }
}
