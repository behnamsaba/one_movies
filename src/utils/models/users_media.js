/** Related functions for watchlist. */
import db from '../db';
import { BadRequestError, NotFoundError } from '../NextErrors';

class Users_Media {
    //create media(if not exist) and add to watchlist simultaneously
    static async createMediaWatch({
        username,
        apiId,
        category,
        title,
        posterPath,
        rating,
        releaseDate,
    }) {
        console.log('model', username);
        console.log('model2', apiId);
        const duplicateCheck = await db.query(
            `SELECT username
          FROM users_media
          WHERE username = $1 AND api_id = $2`,
            [username, apiId]
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate: ${title}`);
        }

        const checkMedia = await db.query(
            `SELECT api_id
          FROM media
          WHERE api_id = $1`,
            [apiId]
        );

        if (!checkMedia.rows[0]) {
            await db.query(
                `INSERT INTO media (api_id, category,title, poster_path, rating, release_date)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING api_id AS "apiId", category, title, poster_path AS "posterPath", rating, release_date AS "releaseDate"`,
                [apiId, category, title, posterPath, rating, releaseDate]
            );
        }
        //First Add
        await db.query(
            `INSERT INTO users_media (username, api_id)
            VALUES ($1, $2)`,
            [username, apiId]
        );

        //SELECT operation
        const result = await db.query(
            `SELECT media.api_id AS "id",
              media.category,
              media.title,
              media.poster_path,
              media.rating,
              media.release_date
            FROM media
            JOIN users_media ON media.api_id = users_media.api_id
            WHERE users_media.username = $1 AND users_media.api_id = $2`,
            [username, apiId]
        );

        const watchlist = result.rows[0];

        return watchlist;
    }

    static async remove(username, apiId) {
        let result = await db.query(
            `DELETE
             FROM users_media
             WHERE username = $1
             AND api_id = $2
             RETURNING username`,
            [username, apiId]
        );
        const removedItem = result.rows[0];

        if (!removedItem) throw new NotFoundError(`No Media Found: ${apiId}`);
    }
}

export default Users_Media;
