import { clearToken } from '../store/internalDataSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const LogOut = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(clearToken());
        router.push('/');
    };
    return (
        <div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
};

export default LogOut;
