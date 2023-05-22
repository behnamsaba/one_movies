/** NextError extends normal JS error so we can
 *  add a status when we make an instance of it.
 *
 *  The error-handling middleware will return this.
 */

export class NextError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

/** 404 NOT FOUND error. */

export class NotFoundError extends NextError {
    constructor(message = 'Not Found') {
        super(message, 404);
    }
}

/** 400 BAD REQUEST error. */

export class BadRequestError extends NextError {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}

/** 403 BAD REQUEST error. */

export class ForbiddenError extends NextError {
    constructor(message = 'Bad Request') {
        super(message, 403);
    }
}

/** Error inside Middleware  */
export class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthError';
    }
}

export class TokenError extends AuthError {
    constructor(message) {
        super(message);
        this.name = 'TokenError';
    }
}

export class UserError extends AuthError {
    constructor(message) {
        super(message);
        this.name = 'UserError';
    }
}

export class UnauthorizedError extends NextError {
    constructor(message = 'Bad Request') {
        super(message, 401);
    }
}
