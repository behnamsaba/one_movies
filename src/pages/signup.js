import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/actionCreators';

const nameValidation = Yup.string()
    .trim()
    .matches(
        /^[a-zA-Z-'\s]*$/,
        'Only letters, hyphens, and apostrophes are allowed'
    )
    .required('This field is required');

const passwordValidation = Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character'
    )
    .required('Password is required');

const emailValidation = Yup.string()
    .email('Invalid email address')
    .required('Email is required');

const usernameValidation = Yup.string()
    .trim()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .matches(
        /^[a-zA-Z0-9-_]+$/,
        'Username can only contain letters, numbers, hyphens, and underscores'
    );

const SignUp = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                await dispatch(registerUser(values)).unwrap();
                router.push('/');
            } catch (error) {
                console.log(error);

                formik.setErrors({ backendError: error });
            }
        },
        validationSchema: Yup.object({
            firstName: nameValidation,
            lastName: nameValidation,
            username: usernameValidation,
            email: emailValidation,
            password: passwordValidation,
        }),
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <InputField
                id='firstName'
                label='First Name:'
                formik={formik}
                {...formik.getFieldProps('firstName')}
            />
            <InputField
                id='lastName'
                label='Last Name:'
                formik={formik}
                {...formik.getFieldProps('lastName')}
            />
            <InputField
                id='username'
                label='Username:'
                formik={formik}
                {...formik.getFieldProps('username')}
            />
            <InputField
                id='email'
                label='Email:'
                type='email'
                formik={formik}
                {...formik.getFieldProps('email')}
            />
            <InputField
                id='password'
                label='Password:'
                type='password'
                formik={formik}
                {...formik.getFieldProps('password')}
            />
            <button type='submit'>Join!</button>

            {formik.errors.backendError && (
                <div>{formik.errors.backendError}</div>
            )}
        </form>
    );
};

const InputField = ({ id, label, type = 'text', formik, ...props }) => (
    <>
        <label htmlFor={id}>{label}</label>
        <input
            id={id}
            type={type}
            {...props}
        />
        {formik.touched[id] && formik.errors[id] ? (
            <p>{formik.errors[id]}</p>
        ) : null}
    </>
);

export default SignUp;
