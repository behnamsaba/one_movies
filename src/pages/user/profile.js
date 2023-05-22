import Auth from '@/components/Auth';
import { useSelector } from 'react-redux';
import UserProfile from '@/components/UserProfile';
import WatchList from '@/components/WatchList';
import useClick from '@/hooks/useClick';

const Profile = () => {
    const proileData = useSelector((data) => data.internalDataSlice.user);
    const [page, setPage] = useClick();
    const changeHandler = () => {
        setPage();
    };

    return (
        <>
            {page ? (
                <>
                    <button onClick={changeHandler}>WatchList</button>
                    <UserProfile {...proileData} />
                </>
            ) : (
                <>
                    <button onClick={changeHandler}>Account</button>
                    {proileData.watchlist.map((item) => (
                        <WatchList
                            key={item.id}
                            {...item}
                        />
                    ))}
                </>
            )}
        </>
    );
};

export default Auth(Profile);
