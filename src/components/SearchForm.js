import { useFormik } from 'formik';
import { useRouter } from 'next/router';

const SearchForm = () => {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            query: '',
        },
        onSubmit: (values) => {
            router.push(`/search/${values.query}`)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <input
                id='query'
                type='text'
                placeholder='search'
                {...formik.getFieldProps('query')}
            />
            <button type='submit'>Search</button>
        </form>
    );
};

export default SearchForm;
