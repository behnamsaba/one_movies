import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchForm = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            query: '',
        },
        onSubmit: (values) => {
            router.push(`/search/${values.query}`);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ position: 'relative' }}>
            <AiOutlineSearch
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10%',
                    transform: 'translateY(-50%)',
                }}
            />
            <input
                id='query'
                type='text'
                placeholder='Enter your keywords...'
                {...formik.getFieldProps('query')}
                className='input-text'
            />
        </form>
    );
};

export default SearchForm;
