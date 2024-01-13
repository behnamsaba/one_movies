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
            console.log(values);
            router.push(`/search/${values.query}`);
        },
    });

    return (
        <div className='flex justify-center items-center'>
            <form
                onSubmit={formik.handleSubmit}
                className='relative'>
                <AiOutlineSearch className='absolute top-0 left-0 mt-3 ml-3 text-gray-700' />
                <input
                    id='query'
                    type='text'
                    placeholder='Enter your keywords...'
                    {...formik.getFieldProps('query')}
                    className='pl-10 pr-2 py-2 border border-gray-200 rounded-lg w-full text-black'
                />
            </form>
        </div>
    );
};

export default SearchForm;
