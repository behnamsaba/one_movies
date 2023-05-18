import db from '../db';
/** Related functions for watchlist. */

class Users_Media {
    static async create({ username, mediaId }) {
        const duplicateCheck = await db.query(
            `SELECT username
           FROM users_media
           WHERE username = $1 AND media_id = $2`,
            [username, mediaId]
        );

        //

        if (duplicateCheck.rows[0])
            throw new BadRequestError(`Duplicate: ${mediaId}`);

        const result = await db.query(
            `INSERT INTO users_media
           (username, media_id)
           VALUES ($1, $2)
           RETURNING username, media_id AS "mediaId"`,
            [username, mediaId]
        );
        const watchlist = result.rows[0];

        return watchlist;
    }

  
    static async createMediaWatch(data) {
        const duplicateCheck = await db.query(
            `SELECT username
          FROM users_media
          WHERE username = $1 AND api_id = $2`,
            [data.username, data.apiId]
        );

        if (duplicateCheck.rows[0]) {
            return { error: `Duplicate: ${data.apiId}` };
        }

        const checkMedia = await db.query(
            `SELECT api_id, title, poster_path, rating, release_date
          FROM media
          WHERE api_id = $1`,
            [data.apiId]
        );

        if (!checkMedia.rows[0]) {
            await db.query(
                `INSERT INTO media (api_id, title, poster_path, rating, release_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING api_id AS "apiId", title, poster_path AS "posterPath", rating, release_date AS "releaseDate"`,
                [
                    data.apiId,
                    data.title,
                    data.posterPath,
                    data.rating,
                    data.releaseDate,
                ]
            );
        }

        const result = await db.query(
            `INSERT INTO users_media (username, api_id)
          VALUES ($1, $2)
          RETURNING username, api_id AS "apiId"`,
            [data.username, data.apiId]
        );

        const watchlist = result.rows[0];

        return watchlist;
    }
}

export default Users_Media;
