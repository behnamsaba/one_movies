import Format from '@/layout/Format';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { registerUser } from '../store/actionCreators';
import {
    nameValidation,
    emailValidation,
    usernameValidation,
    passwordValidation,
} from '@/utils/front-validation/Validation';
import NotAuth from '@/components/NotAuth';

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

    const [showPassword, setShowPassword] = useState(false);
    return (
        <Format>
            <div className='w-full flex justify-center px-4'>
                <div className='w-full max-w-md mt-12 mb-16 bg-gray-900 border border-gray-700 rounded-xl shadow-xl p-6'>
                    <h1 className='text-2xl font-semibold text-white text-center'>Create an account</h1>
                    <p className='text-sm text-zinc-300 text-center mt-1'>Join to build your watchlist</p>

                    <form onSubmit={formik.handleSubmit} className='mt-6'>
                        <InputField
                            id='firstName'
                            label='First Name'
                            autoComplete='given-name'
                            formik={formik}
                            {...formik.getFieldProps('firstName')}
                        />
                        <InputField
                            id='lastName'
                            label='Last Name'
                            autoComplete='family-name'
                            formik={formik}
                            {...formik.getFieldProps('lastName')}
                        />
                        <InputField
                            id='username'
                            label='Username'
                            autoComplete='username'
                            formik={formik}
                            {...formik.getFieldProps('username')}
                        />
                        <InputField
                            id='email'
                            label='Email'
                            type='email'
                            autoComplete='email'
                            formik={formik}
                            {...formik.getFieldProps('email')}
                        />

                        <div className='mt-3'>
                            <label htmlFor='password' className='formik-label text-zinc-200'>Password</label>
                            <div className='relative'>
                                <input
                                    id='password'
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete='new-password'
                                    {...formik.getFieldProps('password')}
                                    className='input-text w-full pr-10'
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword((v) => !v)}
                                    className='absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-white'
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <p className='formik-error'>{formik.errors.password}</p>
                            ) : null}
                        </div>

                        <button
                            type='submit'
                            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded mt-6 focus:outline-none'
                        >
                            Join!
                        </button>

                        {formik.errors.backendError && (
                            <div className='mt-3 rounded-md bg-red-600/20 border border-red-600 text-red-200 px-3 py-2 text-sm'>
                                {formik.errors.backendError}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </Format>
    );
};

const InputField = ({ id, label, type = 'text', formik, ...props }) => (
    <>
        <label htmlFor={id} className='formik-label text-zinc-200'>{label}</label>
        <input id={id} type={type} {...props} className='input-text w-full' />
        {formik.touched[id] && formik.errors[id] ? (
            <p className='formik-error'>{formik.errors[id]}</p>
        ) : null}
    </>
);

export default NotAuth(SignUp);
