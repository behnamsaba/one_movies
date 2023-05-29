import db from '../db';
import bcrypt from 'bcrypt';
import { sqlForPartialUpdate } from '../helpers/sql';
import {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} from '../NextErrors';

import { BCRYPT_WORK_FACTOR } from '../config';

/** Related functions for users. */

class User {
    /** authenticate user with username, password.
     *
     * Returns { username, first_name, last_name, email }
     *
     * Throws UnauthorizedError is user not found or wrong password.
     **/

    static async authenticate(username, password) {
        // try to find the user first
        const result = await db.query(
            `SELECT username,
                  password,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email
           FROM users
           WHERE username = $1`,
            [username]
        );
        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError('Invalid username/password');
    }

    /** Register user with data.
     *
     * Returns { username, firstName, lastName, email}
     *
     * Throws BadRequestError on duplicates.
     **/

    static async register({ firstName, lastName, username, email, password }) {
        const duplicateCheck = await db.query(
            `SELECT username
           FROM users
           WHERE username = $1`,
            [username]
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

        const result = await db.query(
            `INSERT INTO users
           (first_name,
            last_name,
            username,
            email,
            password)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
            [firstName, lastName, username, email, hashedPassword]
        );

        const user = result.rows[0];

        return user;
    }



    /** Given a username, return data about user.
     *
     * Returns { username, first_name, last_name, watch_list }
     *   where watch_list is { id, title , ratting, language, overview,release_data,genre}
     *
     * Throws NotFoundError if user not found.
     **/

    static async get(username) {
        const userRes = await db.query(
            `SELECT username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  email
           FROM users
           WHERE username = $1`,
            [username]
        );

        const user = userRes.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        const userWatchList = await db.query(
            `SELECT media.api_id AS "apiId",
            media.title,media.category,media.poster_path AS "posterPath", media.rating,media.release_date AS "releaseDate" FROM media
            JOIN users_media
            ON media.api_id = users_media.api_id
             WHERE username = $1`,
            [username]
        );

        user.watchlist = userWatchList.rows.map((row) => ({
            id: row.apiId,
            category: row.category,
            title: row.title,
            poster_path: row.posterPath,
            rating: row.rating,
            release_date: row.releaseDate,
        }));
        return user;
    }

    /** Update user data with `data`.
     *
     * This is a "partial update" --- it's fine if data doesn't contain
     * all the fields; this only changes provided ones.
     *
     * Data can include:
     *   { firstName, lastName, password, email}
     *
     * Returns { username, firstName, lastName, email }
     *
     * Throws NotFoundError if not found.
     *
     * WARNING: this function can set a new password
     */

    static async update(username, data) {
        if (data.password) {
            data.password = await bcrypt.hash(
                data.password,
                BCRYPT_WORK_FACTOR
            );
        }

        const { setCols, values } = sqlForPartialUpdate(data, {
            firstName: 'first_name',
            lastName: 'last_name',
        });
        const usernameVarIdx = '$' + (values.length + 1);

        const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email`;
        const result = await db.query(querySql, [...values, username]);
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        delete user.password;
        return user;
    }

    /** Delete given user from database; returns undefined. */

    static async remove(username) {
        let result = await db.query(
            `DELETE
               FROM users
               WHERE username = $1
               RETURNING username`,
            [username]
        );
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);
    }

    /** Add to watchlist: update db, returns undefined.
     *
     * - username: username add media to watchlist
     * - mediaId: mediaId
     **/

    static async addWatchList(username, mediaId) {
        const preCheck = await db.query(
            `SELECT id
           FROM watchlist
           WHERE id = $1`,
            [mediaId]
        );
        const media = preCheck.rows[0];

        if (!media) throw new NotFoundError(`No media: ${mediaId}`);

        const preCheck2 = await db.query(
            `SELECT username
           FROM users
           WHERE username = $1`,
            [username]
        );
        const user = preCheck2.rows[0];

        if (!user) throw new NotFoundError(`No username: ${username}`);

        await db.query(
            `INSERT INTO watchlist (username,mediaId)
           VALUES ($1, $2)`,
            [username, mediaId]
        );
    }
}

export default User;
