import * as Yup from 'yup';

export const nameValidation = Yup.string()
    .trim()
    .matches(
        /^[a-zA-Z-'\s]*$/,
        'Only letters, hyphens, and apostrophes are allowed'
    )
    .required('This field is required');

export const passwordValidation = Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character'
    )
    .required('Password is required');

export const emailValidation = Yup.string()
    .email('Invalid email address')
    .required('Email is required');

export const usernameValidation = Yup.string()
    .trim()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .matches(
        /^[a-zA-Z0-9-_]+$/,
        'Username can only contain letters, numbers, hyphens, and underscores'
    );