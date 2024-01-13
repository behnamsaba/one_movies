import { clearToken } from '../store/internalDataSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
import Link from 'next/link';
const LogOut = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(clearToken());
        router.push('/login');
    };
    return (
        <div>
            <Link
                href='/'
                onClick={handleLogout}
                className='flex justify-center'>
                <AiOutlineLogout className='ml-1 text-white font-semibold' />
                Logout
            </Link>
        </div>
    );
};

export default LogOut;
