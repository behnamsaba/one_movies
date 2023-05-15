import db from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';

/** Related functions for watchlist. */

class watchlist {
  static async create({ userId, mediaId }) {
    const duplicateCheck = await db.query(
          `SELECT mediaId
           FROM watchlist
           WHERE midaId = $1`,
        [mediaId]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate: ${mediaId}`);

    const result = await db.query(
          `INSERT INTO watchlist
           (user_id, media_Id)
           VALUES ($1, $2)
           RETURNING id, user_id AS "UserId", media_id AS "media_id"`,
        [
          userId,
          mediaId,
        ],
    );
    const watchlist = result.rows[0];

    return watchlist;
  }

}


export default watchlist