import Format from '@/layout/Format';
import Auth from '@/components/Auth';
import { useSelector } from 'react-redux';
import UserProfile from '@/components/UserProfile';
import WatchItem from '@/components/WatchItem';
import useClick from '@/hooks/useClick';

const Profile = () => {
    const profileData = useSelector((data) => data.internalDataSlice.user);
    const [page, setPage] = useClick();
    const changeHandler = () => {
        setPage();
    };

    return (
        <Format>
            {page ? (
                <>
                    <button onClick={changeHandler}>WatchList</button>
                    <UserProfile {...profileData} />
                </>
            ) : (
                <>
                    <button onClick={changeHandler}>Account</button>
                    {profileData.watchlist.map((item) => (
                        <WatchItem
                            key={item.id}
                            {...item}
                        />
                    ))}
                </>
            )}
        </Format>
    );
};

export default Auth(Profile);
