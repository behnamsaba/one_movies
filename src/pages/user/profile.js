import Format from '@/layout/Format';
import Auth from '@/components/Auth';
import { useSelector } from 'react-redux';
import UserProfile from '@/components/UserProfile';
import WatchItem from '@/components/WatchItem';
import useClick from '@/hooks/useClick';
import Link from 'next/link';

const Profile = () => {
    const profileData = useSelector((data) => data.internalDataSlice.user);
    const [page, setPage] = useClick(); // true: Account, false: Watchlist

    const initials = (profileData?.username || 'U')[0].toUpperCase();
    const displayName =
        profileData?.firstName || profileData?.lastName
            ? `${profileData?.firstName || ''} ${profileData?.lastName || ''}`.trim()
            : profileData?.username;

    return (
        <Format>
            <div className='flex-1 max-w-6xl mx-auto px-4 py-8 w-full'>
                {/* Profile Header */}
                <div className='bg-gray-900 rounded-lg p-6 flex items-center gap-4 shadow-md border border-gray-700'>
                    <div className='h-14 w-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold'>
                        {initials}
                    </div>
                    <div className='text-zinc-200'>
                        <div className='text-lg font-semibold'>{displayName}</div>
                        <div className='text-sm text-zinc-400'>{profileData?.email}</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className='mt-6 flex items-center gap-2 border-b border-gray-700'>
                    <button
                        onClick={() => (page ? null : setPage())}
                        className={`${page ? 'text-white border-b-2 border-white' : 'text-zinc-400 hover:text-white'} px-4 py-2`}
                    >
                        Account
                    </button>
                    <button
                        onClick={() => (!page ? null : setPage())}
                        className={`${!page ? 'text-white border-b-2 border-white' : 'text-zinc-400 hover:text-white'} px-4 py-2`}
                    >
                        Watchlist
                    </button>
                </div>

                {/* Content */}
                <div className='mt-4'>
                    {page ? (
                        <div className='bg-gray-900 rounded-lg p-6 shadow-md border border-gray-700'>
                            <UserProfile {...profileData} />
                        </div>
                    ) : (
                        <div className='bg-gray-900 rounded-lg p-6 shadow-md border border-gray-700 min-h-[50vh] flex items-center justify-center'>
                            {profileData && profileData.watchlist.length === 0 ? (
                                <div className='text-center text-zinc-300'>
                                    <p className='mb-4'>Your watchlist is empty.</p>
                                    <Link href='/movies/1' className='btn-red inline-block'>Browse movies</Link>
                                </div>
                            ) : (
                                <div className='cards'>
                                    {profileData?.watchlist?.map((item) => (
                                        <WatchItem key={item.id} {...item} />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Format>
    );
};

export default Auth(Profile);
