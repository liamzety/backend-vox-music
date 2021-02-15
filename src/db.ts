import pg from 'pg';
export const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || process.env.DATABASE_URL_DEV,
  ssl: process.env.DATABASE_URL
    ? {
        rejectUnauthorized: false,
      }
    : false,
});
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
  });
});
