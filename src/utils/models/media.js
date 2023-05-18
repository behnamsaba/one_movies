import db from '../db';

/** Related functions for Media. */

class Media {
    static async create({ apiId, title, posterPath, rating, releaseDate }) {
        const duplicateCheck = await db.query(
            `SELECT api_id,
          title,poster_path,
          rating,
          release_date
          FROM media
          WHERE api_id = $1`,
            [apiId]
        );

        if (duplicateCheck.rows[0]) {
            return duplicateCheck.rows[0];
        }

        

        const result = await db.query(
            `INSERT INTO media (
                            api_Id,
                            title,
                            poster_path,
                            rating,
                            release_date)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING api_Id AS "apiId",title,poster_path AS "posterPath",rating, release_Date AS "releaseDate"`,
            [apiId, title, posterPath, rating, releaseDate]
        );
        let media = result.rows[0];

        return media;
    }
}

export default Media;
