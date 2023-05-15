import db from '../db';
import { sqlForPartialUpdate } from '../helpers/sql';




/** Related functions for Media. */

class Media {
  static async create(data) {
    const result = await db.query(
          `INSERT INTO Media (
                            title,
                            api_id
                             poster_path,
                             release_Date,
                             genre)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id,title,api_id AS "apiId",poster_path AS "posterPath", release_Date AS "releaseDate",genre`,
        [data.title,
          data.apiId,
          data.posterPath,
          data.ratting,,
          data.releaseDate,
          data.genre
        ]);
    let media = result.rows[0];

    return media;
  }


}

export default Media
