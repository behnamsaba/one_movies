import db from '../db';

/** Related functions for Media. */

class Media {
    static async create(data) {
        const result = await db.query(
            `INSERT INTO Media (
                            api_Id,
                            title,
                             poster_path,
                             rating,
                             release)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING api_Id,title,poster_path AS "posterPath",ratting, release_Date AS "releaseDate"`,
            [
                data.apiId,
                data.title,
                data.posterPath,
                data.ratting,
                data.releaseDate,
            ]
        );
        let media = result.rows[0];

        return media;
    }
}

export default Media;
