import { clearToken } from '../store/internalDataSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
import Link from 'next/link';
import oneMoviesApi from '@/api/api';
const LogOut = ({ className = '' }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        oneMoviesApi.setToken(null);
        dispatch(clearToken());
        router.push('/login');
    };
    return (
        <Link
            href='/'
            onClick={handleLogout}
            className={`inline-flex items-center gap-1 ${className}`}>
            <AiOutlineLogout className='inline-block' />
            Logout
        </Link>
    );
};

export default LogOut;
