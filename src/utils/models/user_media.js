import db from '../db';
/** Related functions for watchlist. */

class Users_Media {
  static async create({ username, mediaId }) {
    const duplicateCheck = await db.query(
          `SELECT username
           FROM users_media
           WHERE media_id = $1 AND username = $2`,
        [mediaId,
      username]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate: ${mediaId}`);

    const result = await db.query(
          `INSERT INTO users_media
           (username, media_id)
           VALUES ($1, $2)
           RETURNING username, media_id AS "mediaId"`,
        [
          userId,
          mediaId,
        ],
    );
    const watchlist = result.rows[0];

    return watchlist;
  }

}


export default Users_Media