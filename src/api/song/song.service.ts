import { pool } from '../../db';

export const songService = {
  add,
  remove,
};

const SONG_TABLE = 'song';

async function add(songData: {
  title: string;
  url: string;
  video_id: string;
  playlist_id: string;
}) {
  const { title, url, video_id, playlist_id } = songData;
  try {
    const newSong = await pool.query(
      `
            INSERT INTO ${SONG_TABLE} 
            (title,url,video_id,playlist_id) VALUES ($1,$2,$3,$4) RETURNING *`,
      [title, url, video_id, playlist_id]
    );
    return newSong.rows[0];
  } catch (err) {
    throw err;
  }
}

async function remove(query: { id: string }) {
  const { id } = query;
  try {
    await pool.query(
      `
        DELETE FROM ${SONG_TABLE} WHERE _id=$1;
        `,
      [id]
    );
    return;
  } catch (err) {
    throw err;
  }
}
