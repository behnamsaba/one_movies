import { NextResponse } from 'next/server';
import { SECRET_KEY } from './utils/config';
import { jwtVerify } from 'jose';
import { AuthError, TokenError } from './utils/NextErrors';

// Constants
const UNAUTHORIZED_STATUS = 401;
const AUTH_HEADER_NAME = 'Authorization';

// Helpers
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

// Middleware
export async function middleware(request, response) {
    const secret = new TextEncoder().encode(SECRET_KEY);

    try {
        const token = checkAuthorizationHeader(request);
        const result = await verifyToken(token, secret);
        
        //add user to header after verifying token, unlike express we dont access request.query inside middleware
        const newHeaders = new Headers(request.headers);
        newHeaders.set('user', result.payload.username)
        return NextResponse.next({
            request: {
                // New request headers
                headers: newHeaders,
            },
        });
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
