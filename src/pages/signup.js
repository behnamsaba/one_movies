import Format from '@/layout/Format';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
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

    return (
        <Format>
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
        </Format>
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

export default NotAuth(SignUp);
