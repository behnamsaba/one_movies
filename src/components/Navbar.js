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
                        className='text-center on-hover'>
                        {user.username}
                    </Link>
                    <a>
                        <BiHeartSquare
                            color='red'
                            size={30}
                        />
                        {user.watchlist.length}
                    </a>
                    <LogOut className='on-hover'/>
                </div>
            ) : (
                <div className='flex flex-col md:flex-row gap-5 absolute right-5 md:right-10'
                 >
                    <Link href='/login' className='on-hover'>
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
        <nav className='bg-gray-800 text-zinc-300 relative'>
            <Link
                href='/'
                className='absolute left-5 top-1/2 transform -translate-y-1/2 hover:text-white'>
                <Image
                    src='/logo.png'
                    alt='onemovies'
                    width={100}
                    height={50}
                    className='rounded px-0 md:width-200 md:height-100'
                />
            </Link>
            <div className='container mx-auto flex flex-col items-start md:items-center md:flex-row md:justify-between text-center py-3 pl-16 md:pl-40 pr-5'>
                <div className='w-full order-2 md:order-1 flex justify-center py-3 md:py-0 '>
                    <SearchForm />
                </div>
                <div className='flex items-center gap-6 my-3 md:my-0'>
                    <Link href='/' className='on-hover'>Home</Link>
                    <Link href='/top-imdb/1' className='on-hover'>Top IMDb</Link>
                    <Link href='/tv-series/1' className='on-hover'>TV Series</Link>
                    <Link href='/movies/1' className='on-hover'>Movies</Link>
                    <Genre href='on-hover'/>
                </div>
                <UserSection user={user} />
            </div>
        </nav>
    );
}

export default Navbar;
