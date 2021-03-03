import { pool } from '../../db.js';

export const playlistService = {
  query,
  create,
  update,
  remove,
  getPlayingSongPlaylist,
};

const PLAYLIST_TABLE = 'playlist';
const SONG_TABLE = 'song';

async function query(filterBy?: {
  id?: string;
  favouritePlaylistsIdsFound?: any;
}) {
  try {
    if (filterBy) {
      if (filterBy.id) {
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
      } else if (filterBy.favouritePlaylistsIdsFound) {
        const { favouritePlaylistsIdsFound } = filterBy;
        let playlists = await favouritePlaylistsIdsFound.map(
          async ({ playlist_id }: any) => {
            const x = await pool.query(
              `
            SELECT * FROM ${PLAYLIST_TABLE}
             WHERE _id = $1 
             `,
              [playlist_id]
            );
            return x.rows[0];
          }
        );
        playlists = await Promise.all(playlists);
        return playlists;
      }
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
  created_by: string;
}) {
  const { name, description, img, genre, created_by } = playlistData;
  try {
    const newPlaylist = await pool.query(
      `
              INSERT INTO ${PLAYLIST_TABLE} 
              (name,description,img,genre,created_by) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [name, description, img, genre, created_by]
    );
    return newPlaylist.rows[0];
  } catch (err) {
    console.error('err, playlist.service -> create():', err.message);
    throw { message: 'Could not create playlist.' };
  }
}
async function update(query: {
  _id: string;
  name: string;
  description: string;
  genre: string;
  img: string;
}) {
  const { _id, name, description, genre, img } = query;
  try {
    const updatedPlaylist = await pool.query(
      `
              UPDATE ${PLAYLIST_TABLE} SET name = $2,
              description = $3,
              genre = $4,
              img = $5
              WHERE _id = $1 RETURNING *
              `,
      [_id, name, description, genre, img]
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
async function getPlayingSongPlaylist(songUrl: string) {
  try {
    const songFound = await pool.query(
      `
              SELECT * FROM ${SONG_TABLE} WHERE video_id=$1;
              `,
      [songUrl]
    );
    const playlistId = songFound.rows[0].playlist_id;

    const playlistFound = await pool.query(
      `
              SELECT * FROM ${PLAYLIST_TABLE} WHERE _id=$1;
              `,
      [playlistId]
    );
    return playlistFound.rows[0]._id;
  } catch (err) {
    console.error('err, playlist.service -> remove():', err.message);
    throw { message: 'Could not remove playlist.' };
  }
}
