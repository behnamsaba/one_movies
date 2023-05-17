import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
    nameValidation,
    emailValidation,
} from '@/utils/front-validation/Validation';
import { userChange } from '../../store/actionCreators';

const Profile = () => {
    const proileData = useSelector((data) => data.internalDataSlice.user);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: async (values) => {
            try {
                await dispatch(
                    userChange({ username: proileData.username, data: values })
                ).unwrap();
                alert('Successfully Changed');
            } catch (e) {
                console.log(e);
                formik.setErrors({ backendError: e });
            }
        },
        validationSchema: Yup.object({
            firstName: nameValidation,
            lastName: nameValidation,
            email: emailValidation,
        }),
    });

    if (proileData) {
        formik.initialValues.firstName = proileData.firstName;
        formik.initialValues.lastName = proileData.lastName;
        formik.initialValues.email = proileData.email;
    }

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


export default Profile;
