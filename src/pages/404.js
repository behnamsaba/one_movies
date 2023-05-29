import Link from 'next/link';
import Format from '@/layout/Format';

const NotFound = () => {
    return (
        <Format>
            <h1 className='text-2xl mb-4'>404 - Page Not Found</h1>
            <Link
                href='/'
                className='text-blue-500 hover:underline'>
                Go back to home
            </Link>
        </Format>
    );
};

export default NotFound;
