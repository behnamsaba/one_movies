import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {
    nameValidation,
    emailValidation,
} from '@/utils/front-validation/Validation';
import { userChange } from '@/store/actionCreators';

const UserProfile = ({ username, firstName, lastName, email }) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            firstName,
            lastName,
            email,
        },
        onSubmit: async (data) => {
            try {
                await dispatch(userChange({ username, data })).unwrap();
                alert('Successfully Changed');
            } catch (e) {
                formik.setErrors({ backendError: e });
            }
        },
        validationSchema: Yup.object({
            firstName: nameValidation,
            lastName: nameValidation,
            email: emailValidation,
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
                id='email'
                label='Email:'
                type='email'
                formik={formik}
                {...formik.getFieldProps('email')}
            />
            <button type='submit'>Save Changes</button>

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

export default UserProfile;
