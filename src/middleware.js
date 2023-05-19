import { NextResponse, NextRequest } from 'next/server';
import { SECRET_KEY } from './utils/config';
import { jwtVerify } from 'jose';

// Constants
const UNAUTHORIZED_STATUS = 401;
const AUTH_HEADER_NAME = 'Authorization';
const PATH_SLICE_START = 13;

// Function to extract user from the request path
const extractPathUser = (request) =>
    request.nextUrl.pathname.slice(PATH_SLICE_START);

// Function to verify the token
const verifyToken = async (token, secret) => {
    try {
        // Attempt to verify the provided token with the secret key
        return await jwtVerify(token, secret);
    } catch (err) {
        // If verification fails, throw an error
        throw new Error('Invalid or expired token');
    }
};

// Function to check if Authorization header exists in the request
const checkAuthorizationHeader = (headers) => {
    // Get the token from the header
    const token = headers.get(AUTH_HEADER_NAME);
    // If the token does not exist, throw an error
    if (!token) {
        throw new Error('Authorization header must be provided');
    }
    // Return the token
    return token;
};

// Function to verify if the user in the request matches the user in the token
const verifyUser = async (request, result, userFromPath) => {
    // If the user does not match, throw an error
    if (result.payload.username !== userFromPath) {
        throw new Error('Not authorized to access this route');
    }
    // Return the request
    return request;
};

// Function to return error response
const sendErrorResponse = (error) => {
    // Return error response with error message and unauthorized status
    return NextResponse.json(
        { error: error.message },
        { status: UNAUTHORIZED_STATUS }
    );
};

// Middleware
export async function middleware(request) {
    const { headers } = request;
    // Encoding the secret key
    const secret = new TextEncoder().encode(SECRET_KEY);

    try {
        // Check if Authorization header exists and get the token
        const token = checkAuthorizationHeader(headers);
        // Verify the token
        const result = await verifyToken(token, secret);
        // Depending on the pathname, get the user from the path or from the request body
        const userFromPath = request.nextUrl.pathname.startsWith(
            '/api/profile/watchlist'
        )
            ? (await request.json()).username
            : extractPathUser(request);
        // Verify if the user in the request matches the user in the token
        await verifyUser(request, result, userFromPath);
        // If all checks pass, return success response
        return NextResponse.next();
    } catch (err) {
        // If any error occurs, return error response
        return sendErrorResponse(err);
    }
}

// Route configuration
export const config = {
    matcher: '/api/profile/:path*',
};
