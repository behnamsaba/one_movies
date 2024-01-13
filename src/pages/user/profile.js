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
                    <button
                        onClick={changeHandler}
                        className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-auto block m-12'>
                        WatchList
                    </button>
                    <UserProfile {...profileData} />
                </>
            ) : (
                <>
                    <button
                        onClick={changeHandler}
                        className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-auto block m-12'>
                        Account
                    </button>
                    {profileData && profileData.watchlist.length === 0 ? (
                        <p className='text-white font-bold py-2 px-4 rounded mx-auto block'>
                            There is currently no watchlist now
                        </p>
                    ) : (
                        <div className='cards'>
                            {profileData
                                ? profileData.watchlist.map((item) => (
                                      <WatchItem
                                          key={item.id}
                                          {...item}
                                      />
                                  ))
                                : null}
                        </div>
                    )}
                </>
            )}
        </Format>
    );
};

export default Auth(Profile);
