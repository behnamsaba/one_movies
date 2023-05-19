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

    //create media(if not exist) and add to watchlist simultaneously
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
        //First Add
        await db.query(
            `INSERT INTO users_media (username, api_id)
            VALUES ($1, $2)`,
            [data.username, data.apiId]
        );

        //SELECT operation
        const result = await db.query(
            `SELECT media.api_id AS "apiId",
              media.title,
              media.poster_path AS "posterPath",
              media.rating,
              media.release_date AS "releaseDate"
            FROM media
            JOIN users_media ON media.api_id = users_media.api_id
            WHERE users_media.username = $1 AND users_media.api_id = $2`,
            [data.username, data.apiId]
        );

        const watchlist = result.rows[0];

        return watchlist;
    }
}

export default Users_Media;
