import { NextResponse } from 'next/server';
import { SECRET_KEY } from './utils/config';
import { jwtVerify } from 'jose';
import { AuthError, UserError, TokenError } from './utils/NextErrors';

// Constants
const UNAUTHORIZED_STATUS = 401;
const AUTH_HEADER_NAME = 'Authorization';
const PATH_SLICE_START = 13;

// Helpers
const extractPathUser = ({ nextUrl: { pathname } }) =>
    pathname.slice(PATH_SLICE_START);

const verifyToken = async (token, secret) => {
    try {
        return await jwtVerify(token, secret);
    } catch {
        throw new TokenError('Invalid or expired token');
    }
};

const checkAuthorizationHeader = ({ headers }) => {
    const token = headers.get(AUTH_HEADER_NAME);
    if (!token) {
        throw new AuthError('Authorization header must be provided');
    }
    return token;
};

const verifyUser = async ({ payload: { username } }, userFromPath) => {
    if (username !== userFromPath) {
        throw new UserError('Not authorized to access this route');
    }
};

// Middleware
export async function middleware(request) {
    const secret = new TextEncoder().encode(SECRET_KEY);

    try {
        const token = checkAuthorizationHeader(request);
        const result = await verifyToken(token, secret);
        const userFromPath = extractPathUser(request);
        await verifyUser(result, userFromPath);

        // If all checks pass, return success response
        return NextResponse.next();
    } catch (err) {
        // If any error occurs, return error response
        return NextResponse.json(
            { error: err.message },
            { status: UNAUTHORIZED_STATUS }
        );
    }
}

// Route configuration
export const config = {
    matcher: '/api/profile/:path*',
};
