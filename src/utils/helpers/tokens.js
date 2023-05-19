import { SignJWT } from 'jose';
import { SECRET_KEY } from '../config';

/** return signed JWT from user data. */
export async function createToken(user) {
    const secret = new TextEncoder().encode(SECRET_KEY);
    const alg = 'HS256';

    const payload = {
        username: user.username,
    };

    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg })
        .setExpirationTime('30d') //30 days token valid
        .sign(secret);

    return jwt;
}
