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
        <>
            <form onSubmit={formik.handleSubmit}>
                <InputField
                    id='username'
                    label='Username:'
                    formik={formik}
                    {...formik.getFieldProps('username')}
                />

                <InputField
                    id='password'
                    label='Password:'
                    type='password'
                    formik={formik}
                    {...formik.getFieldProps('password')}
                />
                <button type='submit'>Login</button>

                {formik.errors.backendError && (
                    <div>{formik.errors.backendError}</div>
                )}
            </form>
            <p>
                Dont have account? <Link href={'/signup'}>Register</Link>
            </p>
        </>
    );
};

const InputField = ({ id, label, type = 'text', formik, ...props }) => (
    <>
        <label htmlFor={id}>{label}</label>
        <input
            id={id}
            type={type}
            {...props}
            className='input-text'
        />
        {formik.touched[id] && formik.errors[id] ? (
            <p>{formik.errors[id]}</p>
        ) : null}
    </>
);

export default NotAuth(Login);
