import Format from '@/layout/Format';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/actionCreators';
import Link from 'next/link';
import {
    usernameValidation,
    passwordValidation,
} from '@/utils/front-validation/Validation';
import * as Yup from 'yup';
import NotAuth from '@/components/NotAuth';
const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                await dispatch(loginUser(values)).unwrap();
                router.push('/');
            } catch (error) {
                formik.setErrors({ backendError: error });
            }
        },
        validationSchema: Yup.object({
            username: usernameValidation,
            password: passwordValidation,
        }),
    });

    return (
        <Format>
            <form onSubmit={formik.handleSubmit} className='formik-form'>
                <InputField
                    id='username'
                    label='Username'
                    formik={formik}
                    {...formik.getFieldProps('username')}
                />

                <InputField
                    id='password'
                    label='Password'
                    type='password'
                    formik={formik}
                    {...formik.getFieldProps('password')}
                />
                <button type='submit' className='bg-indigo-500 text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-indigo-700 focus:outline-none'>Login</button>

                {formik.errors.backendError && (
                    <div>{formik.errors.backendError}</div>
                )}
            </form>
            <p className='text-center mt-6'>
                Dont have account? <Link href='/signup' className='text-red-800 hover:underline'>Register</Link>
            </p>
        </Format>
    );
};

const InputField = ({ id, label, type = 'text', formik, ...props }) => (
    <>
        <label htmlFor={id} className='formik-label'>{label}</label>
        <input
            id={id}
            type={type}
            {...props}
            className='input-text'
        />
        {formik.touched[id] && formik.errors[id] ? (
            <p className='formik-error'>{formik.errors[id]}</p>
        ) : null}
    </>
);

export default NotAuth(Login);
