import Link from 'next/link';
import { useSelector } from 'react-redux';
import { AiOutlineLogin } from 'react-icons/ai';
import { BiHeartSquare } from 'react-icons/bi';
import Image from 'next/image';
import Genre from './Genre';
import SearchForm from './SearchForm';
import LogOut from './LogOut';

function UserSection({ user }) {
    return (
        <>
            {user ? (
                <div className='flex flex-col md:flex-row gap-5 absolute right-5 md:right-10'>
                    <Link
                        href='/user/profile'
                        className='text-center'>
                        {user.username}
                    </Link>
                    <a>
                        <BiHeartSquare
                            color='red'
                            size={30}
                        />
                        {user.watchlist.length}
                    </a>
                    <LogOut />
                </div>
            ) : (
                <div className='flex items-center'>
                    <Link href='/login'>
                        <span>login</span>
                        <AiOutlineLogin />
                    </Link>
                </div>
            )}
        </>
    );
}

function Navbar() {
    const { user } = useSelector((state) => state.internalDataSlice);

    return (
        <nav className='relative'>
            <Link
                href='/'
                className='absolute left-5 top-1/2 transform -translate-y-1/2'>
                <Image
                    src='/logo.png'
                    alt='onemovies'
                    width={100}
                    height={50}
                    className='rounded px-0 md:width-200 md:height-100'
                />
            </Link>
            <div className='container mx-auto flex flex-col items-start md:items-center md:flex-row md:justify-between text-center py-3 pl-16 md:pl-40 pr-5'>
                <div className='w-full order-2 md:order-1 flex justify-center py-3 md:py-0'>
                    <SearchForm />
                </div>
                <div className='flex items-center gap-6 my-3 md:my-0'>
                    <Link href='/'>Home</Link>
                    <Link href='/top-imdb/1'>Top IMDb</Link>
                    <Link href='/tv-series/1'>TV Series</Link>
                    <Link href='/movies/1'>Movies</Link>
                    <Genre />
                </div>
                <UserSection user={user} />
            </div>
        </nav>
    );
}

export default Navbar;
