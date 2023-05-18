//check token and compare path and user
import { NextResponse } from 'next/server';
import { SECRET_KEY } from './utils/config';
import { jwtVerify } from 'jose';

const UNAUTHORIZED_STATUS = 401;
const AUTH_HEADER_NAME = 'Authorization';
const PATH_SLICE_START = 13;

const extractPathUser = (request) =>
    request.nextUrl.pathname.slice(PATH_SLICE_START);

const verifyToken = async (token, secret) => {
    try {
        return await jwtVerify(token, secret);
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};

// Middleware
export async function middleware(request) {
    const { headers } = request;
    const token = headers.get(AUTH_HEADER_NAME);
    const secret = new TextEncoder().encode(SECRET_KEY);
    if (!token) {
        return NextResponse.json(
            { error: 'Authorization header must be provided' },
            { status: UNAUTHORIZED_STATUS }
        );
    }

    if (request.nextUrl.pathname.startsWith('/api/profile/watchlist')){
        try {
            const result = await verifyToken(token, secret);
        } catch (err) {
            return NextResponse.json(
                { error: err.message },
                { status: UNAUTHORIZED_STATUS }
            );
        }


    }else{
        const userFromPath = extractPathUser(request);
        try {
            const result = await verifyToken(token, secret);
            if (result.payload.username !== userFromPath) {
                return NextResponse.json(
                    { error: 'Not authorized to access this route' },
                    { status: UNAUTHORIZED_STATUS }
                );
            }
        } catch (err) {
            return NextResponse.json(
                { error: err.message },
                { status: UNAUTHORIZED_STATUS }
            );
        }
        return NextResponse.next();

    }

}

// Route configuration
export const config = {
    matcher: '/api/profile/:path*',
};
